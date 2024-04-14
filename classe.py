from main import Conn
from PIL import Image
from io import BytesIO

import json
import mysql.connector

class Persona: 
        
    def calcModify(number):
        modify = 0;

        if number == 1: 
            modify = -5
            return modify
        
        if number >= 2 and number <= 3: 
            modify = -4
            return modify 
        
        if number >= 4 and number <= 5: 
            modify = -3
            return modify
        
        if number >= 6 and number <= 7:
            modify = -2
            return modify; 
        
        if number >= 8 and number <= 9: 
            modify = -1
            return modify
        
        if number >= 10 and number <= 11: 
            modify = -0
            return modify
        
        if number >= 12 and number <= 13:
            modify = 1 
            return modify
        
        if number >= 14 and number <= 15:
            modify = 2
            return modify
        
        if number >= 16 and number <= 17:
            modify = 3
            return modify
        
        if number >= 18 and number <= 19:
            modify = 4
            return modify
        
        if number >= 20 and number <= 21:
            modify = 5
            return modify
        
        if number >= 22 and number <= 23:
            modify = 6
            return modify
        
        if number >= 24 and number <= 25:
            modify = 7
            return modify 
        
        if number >= 26 and number <= 27:
            modify = 8
            return modify 
        
        if number >= 28 and number <= 29:
            modify = 9
            return modify
        
        if number == 30:
            modify = 10
            return modify        
    
    def getPersona(Id):

        conn = Conn.connect_todb();
        cursor = conn.cursor();
        print(Id)
        query = "SELECT Nome FROM view_persona_stats WHERE Criado_por="+Id;
        cursor.execute(query);
        result = cursor.fetchall();

        return result
    
    def getPersonaInfo(name):  
         
         conn = Conn.connect_todb();
         cursor = conn.cursor();

         query = "SELECT * FROM view_persona_stats WHERE Nome='"+ name +"'";
         cursor.execute(query); 
         data = cursor.fetchone()        
         result = {
             "Nome": data[1],
             "Nivel": data[2],
             "Classe": data[4],
             "Raça": data[3],
             "Status": {
                 "Força": data[7],
                 "Destreza": data[8],
                 "Constituição": data[9],
                 "Carisma": data[10],
                 "Inteligência": data[11],
                #  "Sabedoria": data[12]
             },
             "Modificadores": {
                 "Força": Persona.calcModify(data[7]),
                 "Destreza": Persona.calcModify(data[8]),
                 "Constituição": Persona.calcModify(data[9]),
                 "Carisma": Persona.calcModify(data[10]),
                 "Inteligência": Persona.calcModify(data[11]),
                #  "Sabedoria": data[12]
             }            
         }   

         return result;

    def uploadImagem(img):           
        
        imagem = Image.open(BytesIO(img))
        path = 'E://apps//imm.png'
        imagem.save(path)
       
        return 1
 
        
         
