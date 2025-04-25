from flask import Flask, request, jsonify, send_from_directory, render_template, redirect, url_for, session, send_file
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import ctypes
import subprocess
import os


app = Flask(__name__)
CORS(app, supports_credentials=True)
app.secret_key = 'yocto_project'  # llave para la encriptación

CORS(app, resources={
    r"/*": {
        "origins": "http://localhost:4200",
        "supports_credentials": True,
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Configurar SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Ruta donde se guardará la imagen capturada
IMAGE_FOLDER = os.path.join(os.getcwd(), 'imagenes')
os.makedirs(IMAGE_FOLDER, exist_ok=True)
IMAGE_PATH = os.path.join(IMAGE_FOLDER, 'captura.jpg')

# Cargar la librería desde /usr/lib
lib = ctypes.CDLL("/usr/lib/libgpio.so")

# Definición de firmas de funciones
lib.pinMode.argtypes = [ctypes.c_int, ctypes.c_int]
lib.pinMode.restype = None

lib.digitalWrite.argtypes = [ctypes.c_int, ctypes.c_int]
lib.digitalWrite.restype = None

lib.digitalRead.argtypes = [ctypes.c_int]
lib.digitalRead.restype = ctypes.c_int

lib.unexportPin.argtypes = [ctypes.c_int]
lib.unexportPin.restype = None

# Luces
PIN_OUTPUTS = [5, 6, 17, 22, 27]
# Puertas
PIN_INPUTS = [16, 23, 24, 25]


# Configuración automatica de pines
def setup_pins():
    for pin in PIN_OUTPUTS:
        lib.pinMode(pin, 1)  # 1 = OUTPUT
    for pin in PIN_INPUTS:
        lib.pinMode(pin, 0)  # 0 = INPUT
    print("Pines configurados")

# Ejecutar setup al iniciar
setup_pins()

@app.route('/toggle-light/<light_id>/<value>', methods=['POST'])
def toggle_light(light_id, value):

    if int(light_id) in PIN_OUTPUTS and int(value) in [0, 1]:
        lib.digitalWrite(int(light_id), int(value))
        return jsonify({
            "status": "ok",
            "response": "La luz {light_id} cambió de valor a " + str(value),
            "error": ""
        })
    else:
        return jsonify({
            "status": "error",
            "response": "",
            "error": f'La luz "{light_id}" no existe o el valor no es válido.'
        })


@app.route('/get_light/<light_id>', methods=['GET'])
def get_light_state(light_id):
  
    if int(light_id) in PIN_OUTPUTS:
        value = lib.digitalRead(int(light_id))
        return jsonify({
            "status": "ok",
            "response": value,
            "error": ""
        })
    else:
        return jsonify({
            "status": "error",
            "response": "",
            "error": f'La luz "{light_id}" no existe.'
        })

    
def id_to_name(door_id):
    if door_id == 16:
        return "puerta_bano"
    elif door_id == 23: 
        return "puerta_delantera"
    elif door_id == 24:
        return "puerta_cuarto1"
    else:
        return "puerta_cuarto2"

@app.route('/get_all_doors_state', methods=['GET'])
def get_all_doors_state():
    estados = {}
    for door_id in PIN_INPUTS:
        id_name = id_to_name(door_id)
        value = lib.digitalRead(int(door_id))
        estados[id_name] = value
    return jsonify({
        "status": "ok",
        "response": estados,
        "error": ""
    })

@app.route('/capture', methods=['GET'])
def capture():
                
    try:
        # Tomar la foto con fswebcam
        subprocess.run(
            ['fswebcam', '-r', '1280x720', '--jpeg', '85', '-D', '1', IMAGE_PATH],
            check=True
        )

        # Verificar que la imagen existe
        if not os.path.exists(IMAGE_PATH):
            return jsonify({'status': 'Error', 'error': 'Imagen no fue creada'}), 500

        # Enviar directamente la imagen como respuesta
        return send_file(IMAGE_PATH, mimetype='image/jpeg')

    except subprocess.CalledProcessError:
        return jsonify({'status': 'Error', 'error': 'Error al ejecutar fswebcam'}), 500
    except Exception as e:
        return jsonify({'status': 'Error', 'error': str(e)}), 500

# Endpoint para servir la imagen capturada
@app.route('/get_image', methods=['GET'])
def get_image():
    IMAGE_TEST_PATH = os.path.join(os.getcwd(), "/Users/pepev/OneDrive/Documentos/GitHub/Yocto-Project-1-CE-1113/API/manzana.jpg")
    # IMAGE_TEST_PATH = os.path.join(os.getcwd(), "API/manzana.jpg")
    print("Este es el image path " + IMAGE_TEST_PATH)
        # Verificar que la imagen existe
    if not os.path.exists(IMAGE_TEST_PATH):
        return jsonify({'status': 'Error', 'error': 'La imagen no se encuentra'}), 500

    # Enviar directamente la imagen como respuesta
    return send_file(IMAGE_TEST_PATH, mimetype='image/jpg')

@app.route('/')
def index():
    return jsonify({
        'status': 'Ok',
        'response': 'API Flask funcionando correctamente',
        'error': ''
    })

if __name__ in '__main__':
    # Create a db and table
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0')

