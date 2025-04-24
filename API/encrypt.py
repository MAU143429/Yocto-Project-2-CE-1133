from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

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

@app.route('/login/<string:username>/<string:password>', methods=['GET'])
def login(username, password):
    user = User.query.filter_by(username=username).first()
    
    if user:
        return jsonify({
            'status': 'ok',
            'response': {'username': username},
            'error': ''
        })
    
    if user and check_password_hash(user.password, password):
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
    user = User.query.filter_by(username=username).first()
    
    if user:
        return jsonify({
            'status': 'Error',
            'response': '',
            'error': 'Ya existe el usuario'
        })
    
    # Crear nuevo usuario
    new_user = User(username=username)
    new_user.set_password(password)  # Asume que tienes este método para hashear la contraseña
    db.session.add(new_user)
    db.session.commit()
    session['username'] = username  # Opcional: iniciar sesión automáticamente

    return jsonify({
        'status': 'Ok',
        'response': {'username': username},
        'error': ''
    })

@app.route('/')
def index():
    return jsonify({
        'status': 'ok',
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
    app.run(debug=True)