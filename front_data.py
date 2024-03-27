import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

from dice import Dice

app = Flask(__name__)
CORS(app)

@app.route('/front_data', methods=['POST'])
def receberDados():
    number = Dice.rollD6()
    data = request.json
    print('recebimento dos dados', data)
    return jsonify({'mensagem': number})

@app.route('/', methods=['POST'])
def index():
    # Coloque aqui o código para lidar com a solicitação GET para o endpoint raiz
    return 'Olá, mundo! Esta é a página inicial.'

@app.route('/favicon.ico', methods=['POST'])
def favicon():
    # Coloque aqui o código para lidar com a solicitação GET para o favicon.ico
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

if __name__ == '__main__':
    app.run(debug=True)