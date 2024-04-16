import os
import json
from PIL import Image
from classe import Persona
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

from dice import Dice
from login import Login
from persona import Priest

app = Flask(__name__)
CORS(app)

# rotas dos Dados 
@app.route('/rolld6', methods=['POST'])
def receberDados():
    number = Dice.rollD6(1,1)
    data = request.json    
    return jsonify({'mensagem': number})

@app.route('/rollstats', methods=['GET'])
def receberDados2():
    number = Dice.rollStats()      
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
    
    return jsonify({'mensagem': persona})

@app.route('/postImage', methods=['POST'])
def postImg():      
    if 'image' not in request.files:
        return 'No file part', 400
    imagem = request.files['image']    
    user = request.args['id']   
    path = Persona.uploadImagem(imagem,user) 

    return jsonify({'caminho': path})

@app.route('/getPersonaStats', methods=['GET'])
def getPersonaStats():
    data = request.args.get('nome') 
    persona = Persona.getPersonaInfo(data)
          
    return jsonify({"status":persona})

@app.route('/getPersona', methods=['GET'])
def getPersona():
    data = request.args.get('id')     
    personaList = Persona.getPersona(data)  
    
    return jsonify({'mensagem': personaList})

@app.route('/getClasse', methods=['GET'])
def getClasse():       
    result = Persona.getClasse()  
    
    return jsonify({'mensagem': result})







# rota do login
@app.route('/teste', methods=['GET'])    
def getLogin():
    user = request.args.get('user')
    key = request.args.get('key')

    login = Login.searchLogin(user, key)

    return jsonify({"status":login})

@app.route('/signup', methods=['POST'])
def postUser():
    data = request.json
    user = Login.createUser(data)
    return jsonify({"status":user})

@app.route('/', methods=['POST'])
def index():    
    return 'Olá, mundo! Esta é a página inicial.'

@app.route('/favicon.ico', methods=['POST'])
def favicon():    
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

if __name__ == '__main__':
    app.run(debug=True)