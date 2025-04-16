from flask import Flask, request, jsonify
import ctypes

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

# Configuración automatica de pines
def setup_pins():
    for pin in PIN_OUTPUTS:
        lib.pinMode(pin, 1)  # 1 = OUTPUT
    for pin in PIN_INPUTS:
        lib.pinMode(pin, 0)  # 0 = INPUT
    print("Pines configurados")

# Ejecutar setup al iniciar
setup_pins()

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

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
