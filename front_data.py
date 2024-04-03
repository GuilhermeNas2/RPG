import os

from classe import Persona
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

from dice import Dice
from persona import Priest

app = Flask(__name__)
CORS(app)

# rotas dos Dados 
@app.route('/rolld6', methods=['POST'])
def receberDados():
    number = Dice.rollD6(1,1)
    data = request.json    
    return jsonify({'mensagem': number})

@app.route('/rollstats', methods=['POST'])
def receberDados2():
    number = Dice.rollStats()
    data = request.json    
    return jsonify({'mensagem': number})

@app.route('/rolld20', methods=['POST'])
def receberDados3():
    number = Dice.rollD20()
    data = request.json    
    return jsonify({'mensagem': number})

# rota dos status
@app.route('/postPersona', methods=['POST'])
def postPersona():
    data = request.json    
    persona = Priest.insertPersona(data)  
    
    return jsonify({'mensagem': data})

@app.route('/getPersona', methods=['GET'])
def getPersona():
    data = request.args.get('nome')  
    
    persona = Persona.getPersona(data)  
    
    return jsonify({'mensagem': persona})


@app.route('/', methods=['POST'])
def index():    
    return 'Olá, mundo! Esta é a página inicial.'

@app.route('/favicon.ico', methods=['POST'])
def favicon():    
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

if __name__ == '__main__':
    app.run(debug=True)