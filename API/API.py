from flask import Flask, request, jsonify, send_from_directory, render_template, redirect, url_for, session
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import ctypes
import subprocess
import os

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


PIN_OUTPUTS = [5, 6, 17, 22, 27]
PIN_INPUTS = [24]

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

# Configuración automatica de pines
def setup_pins():
    for pin in PIN_OUTPUTS:
        lib.pinMode(pin, 1)  # 1 = OUTPUT
    for pin in PIN_INPUTS:
        lib.pinMode(pin, 0)  # 0 = INPUT
    print("Pines configurados")

# Ejecutar setup al iniciar
setup_pins()

class User(db.Model):
    """User Model

    Args:
        db (_type_): Model from SQL Alchemy

    Returns:
        string: Only check_password returns, else used to store user info
    """
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(150), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.is_json:
        data = request.get_json()  # Obtiene el JSON del cuerpo
        username = data.get('username')  # Usa .get() para evitar KeyError
        password = data.get('password')

        user = User.query.filter_by(username=username).first()
        
        if user and check_password_hash(user.password, password):
            session['username'] = username
            return jsonify({
                'status': 'Ok',
                'response': {'username': username},
                'error': ''
            })
        else:
            return jsonify({
                'status': 'Error',
                'response': '',
                'error': 'Usuario o contraseña inválidos'
            }), 401  # Código 401 para no autorizado
    else:
        return jsonify({
            'status': 'Error',
            'response': '',
            'error': 'Se esperaba formato JSON'
        }), 400  # Código 400 para bad request


@app.route('/register', methods=['POST'])
def register():

    if request.is_json:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
    else:
        username = request.form.get('username')
        password = request.form.get('password')

    # Verificamos si el usuario ya existe
    user = User.query.filter_by(username=username).first()
    if user:
        # Si es JSON, devolvemos JSON
        if request.is_json:
            return jsonify({
                'status': 'Error',
                'response': '',
                'error': 'Ya existe el usuario'
            })
    else: 
        # Crear nuevo usuario
        new_user = User(username=username)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()
        session['username'] = username

        if request.is_json:
            return jsonify({
                'status': 'Ok',
                'response': {'username': username},
                'error': ''
            })

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
        'status': 'Ok',
        'response': 'API Flask funcionando correctamente',
        'error': ''
    })

# Endpoint para leer un pin de entrada
@app.route('/read', methods=['GET'])
def read():
    pin = int(request.args.get('pin', 0))
    if pin not in PIN_INPUTS:
        return jsonify({'error': 'Pin no permitido para lectura'}), 400
    value = lib.digitalRead(pin)
    return jsonify({'pin': pin, 'value': value})


# Endpoint para escribir a un pin de salida
@app.route('/write', methods=['POST'])
def write():
    data = request.get_json()
    pin = int(data.get('pin', -1))
    value = int(data.get('value', -1))

    if pin not in PIN_OUTPUTS or value not in [0, 1]:
        return jsonify({'error': 'Pin o valor inválido'}), 400

    lib.digitalWrite(pin, value)
    return jsonify({'status': 'ok', 'pin': pin, 'value': value})

@app.route('/capture', methods=['POST'])
def capture():
    try:
        # Comando para capturar la imagen
        subprocess.run(['fswebcam', '--no-banner', '-r', '720x480', IMAGE_PATH], check=True)

        # Retornar la ruta para que Angular pueda mostrarla
        return jsonify({
            'status': 'Ok',
            'imageUrl': '/image/captura.jpg'
        })
    except subprocess.CalledProcessError as e:
        return jsonify({'status': 'Error',
                'response': '',
                'error': 'Error al ejecutar fswebcam'})
    except Exception as e:
        return jsonify({'status': 'Error',
                'response': '',
                'error': 'str(e)'})

# Endpoint para servir la imagen capturada
@app.route('/image/<filename>', methods=['GET'])
def get_image(filename):
    return send_from_directory(IMAGE_FOLDER, filename)

if __name__ in '__main__':
    # Create a db and table
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0')

