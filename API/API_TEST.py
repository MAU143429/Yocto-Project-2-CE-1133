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

# Luces
PIN_OUTPUTS = [5, 6, 17, 22, 27]
# Puertas
PIN_INPUTS = [16, 23, 24, 25]


@app.route('/toggle-light/<light_id>/<value>', methods=['POST'])
def toggle_light(light_id, value):

    if light_id in PIN_OUTPUTS and value in [0, 1]:
        return jsonify({
            "status": "ok",
            "response": "La luz {light_id} cambió de valor a {value}",
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
        return jsonify({
            "status": "ok",
            "response": 0,
            "error": ""
        })
    else:
        return jsonify({
            "status": "error",
            "response": "",
            "error": f'La luz "{light_id}" no existe.'
        })


@app.route('/get_door_state/<door_id>', methods=['GET', 'OPTIONS'])
def get_door_state(door_id):
    if request.method == 'OPTIONS':
        return {}, 200  # Respuesta vacía para preflight
    
    if int(door_id) in PIN_INPUTS:
        return jsonify({ 
            "status": "ok",
            "response": "0",
            "error": ""
        })
    else:
        return jsonify({
            "status": "error",
            "response": "",
            "error": f'La puerta "{door_id}" no existe.'
        })

# Endpoint para servir la imagen capturada
@app.route('/capture', methods=['GET'])
def get_image():
    IMAGE_TEST_PATH = os.path.join(os.getcwd(), "/Users/sebastianqr.2208/Documents/EMPOTRADOS/Yocto-Project-2-CE-1133/API/manzana.jpg")
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

@app.route('/prueba', methods=['GET'])
def prueba():
    return jsonify({
        'status': 'ok',
        'response': 'API Flask funcionando correctamente',
        'error': ''
    })

if __name__ in '__main__':
    # Create a db and table
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0')

