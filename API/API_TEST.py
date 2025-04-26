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

class User(db.Model):
    """User Model

    Args:
        db (_type_): Model from SQL Alchemy

    Returns:
        string: Only check_password returns, else used to store user info
    """
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(400), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

@app.route('/login/<string:username>/<string:password>', methods=['GET'])
def login(username, password):
    user = User.query.filter_by(username=username).first() is not None
    user_obj = User.query.filter_by(username=username).first()
    
    if user and check_password_hash(user_obj.password_hash ,password):
        session['username'] = username
        return jsonify({
            'status': 'ok',
            'response': {'username': username},
            'error': ''
        })
    else:
        return jsonify({
            'status': 'error',
            'response': '',
            'error': 'Usuario o contraseña inválidos'
        })
    
    
@app.route('/register/<string:username>/<string:password>', methods=['POST'])
def register(username, password):
    # Verificar si el usuario ya existe
    user = User.query.filter_by(username=username).first() is not None
    
    if user:
        return jsonify({
            'status': 'Error',
            'response': '',
            'error': 'Ya existe el usuario'
        })
    
    # Crear nuevo usuario
    new_user = User(username=username)
    new_user.set_password(password)  # Asume que tienes este método para hashear la contraseña
    print("Este es el username: " + username)
    print(f"Este es el password: {password}")
    print(f"Este es el password hash creado: {generate_password_hash(password)}")   
    print(f"Este es el password hash guardado: {new_user.password_hash}")
    db.session.add(new_user)
    db.session.commit()
    session['username'] = username  # Opcional: iniciar sesión automáticamente

    return jsonify({
        'status': 'Ok',
        'response': {'username': username},
        'error': ''
    })



@app.route('/toggle-light/<light_id>/<value>', methods=['POST'])
def toggle_light(light_id, value):
    # imprimir el tipo de dato de light_id y de value
    print(f"Tipo de dato de light_id: {type(light_id)}")
    print(f"Tipo de dato de value: {type(value)}")
    if int(light_id) in PIN_OUTPUTS and int(value) in [0, 1]:
        return jsonify({
            "status": "ok",
            "response": "La luz {light_id} cambió de valor a " + str(value),
            "error": ""
        })
    else:
        return jsonify({
            "status": "error",
            "response": "",
            "error": f'La luz {light_id} no existe o el valor no es válido.'
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
    
    if int(door_id) in PIN_INPUTS:
        return jsonify({ 
            "status": "ok",
            "response": 1,
            "error": ""
        })
    else:
        return jsonify({
            "status": "error",
            "response": "",
            "error": f'La puerta "{door_id}" no existe.'
        })
    
def cambiar_id_texto(door_id):
    # Cambiar el id del texto
    if door_id == 16:
        return "puerta_delantera"
    elif door_id == 23: 
        return "puerta_bano"
    elif door_id == 24:
        return "puerta_cuarto1"
    else:
        return "puerta_cuarto2"

@app.route('/get_all_doors_state', methods=['GET'])
def get_all_doors_state():
    # Simulando el estado de las puertas
    estados = {}
    for door_id in PIN_INPUTS:
        nuevo_id = cambiar_id_texto(door_id)
        estado = 1 # AQUI HAY QUE PONER NUESTRA LOGICA
        estados[nuevo_id] = estado
    return jsonify({
        "status": "ok",
        "response": estados,
        "error": ""
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

