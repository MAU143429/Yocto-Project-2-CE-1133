from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.secret_key = 'yocto_project'  # llave para la encriptación

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

@app.route('/login', methods=['GET', 'POST'])
def login():

    if request.is_json:
        data = request.get_json()
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()
        if username in users and check_password_hash(users[username], password):
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
            })
    else:
        return jsonify({
            'status': 'Error',
            'response': '',
            'error': 'No es formato JSON'
        })


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


if __name__ in '__main__':
    # Create a db and table
    with app.app_context():
        db.create_all()
    app.run(debug=True)