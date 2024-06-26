import re

from dice import Dice
from main import Conn
from PIL import Image
from io import BytesIO
from mysql.connector import Error;

class Persona: 

    def __init__(self, nome, nivel, raca, classe):

        lifeModify = Persona.getModifyDice(classe) 

        self.nome = nome;
        self.nivel = nivel
        self.raca = raca;
        self.classe = classe;
        if nivel == "1":
            self.vida = lifeModify[0];
            return
        else:
            self.vida = lifeModify[0] + Dice.rollD6(lifeModify[0],nivel);     
    
    def insertSkills(skill, Id):
        number = 0       
        data = skill["selectedItems"]
        print(data);
        try:
            while number <= len(skill):
                conn = Conn.connect_todb();                
                cursor = conn.cursor();  

                query = "INSERT INTO persona_skills(Id, habilidade, Criado_por, Modificado_por) VALUES(%s,%s,%s,%s)";        
                values = (Id[0], data[number],1,1)
                cursor.execute(query, values);

                conn.commit(); 

                number += 1
        except:
            print('oi')        

      
    def insertStatus(data, name, vida):
        status = []
        status = data;
        nome = name        

        iniciativa = Persona.calcModify(int(status["des"]))
        
        try:
            conn = Conn.connect_todb();
            cursor = conn.cursor();  
            query = "SELECT Id FROM persona WHERE Nome='" + nome +"' ORDER BY Data_criacao DESC";        
            cursor.execute(query);
            Id = cursor.fetchone();                       
            query = "INSERT INTO status(Id,Vida,Iniciativa,Força,Destreza,Carisma,Inteligência,Sabedoria,Criado_por,Modificado_por) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)";
            values = (Id[0],vida[0],iniciativa,status["str"],status["des"],status["char"],status["int"],status["sab"],1,1);
            cursor.execute(query,values); 

            conn.commit(); 
            
        except Error as e:
            print(f"Ocorreu algum erro {e}"  )

    @staticmethod
    def insertPersona(infos):
        data = [];
        data = infos["persona"]
        
        dataStats = []        
        dataStats = infos["status"]  

        dataSkills = []
        dataSkills = infos["skills"]

        persona = Persona(data["nome"],data["nivel"],data["raça"],data["classe"]);

        try:
            conn = Conn.connect_todb();
            cursor = conn.cursor();
            query = "INSERT INTO persona(Nome,Nivel,Raça,Classe,Criado_por,Modificado_por) VALUES (%s,%s,%s,%s,%s,%s)";
            values = (persona.nome,persona.nivel,persona.raca,persona.classe,data["user"],1);
            cursor.execute(query,values);
            conn.commit();

            Persona.insertStatus(dataStats, data["nome"], persona.vida);
        
            query = "SELECT Id FROM persona WHERE Nome='"+persona.nome+"' ORDER BY Data_criacao DESC"
            cursor.execute(query)
            result = cursor.fetchone()

            Persona.insertSkills(dataSkills, result)

            return result
           
        except Error as e:
            print('Algum erro ocorreu e')     


    def getClassMagic(data, nivel):

        conn = Conn.connect_todb();
        cursor = conn.cursor();  
        query = "SELECT * FROM class_magic WHERE classe='"+ data+"' AND nivel <="+nivel ;        
        cursor.execute(query);      
        result = cursor.fetchall()
        
        nome = []
        descricao = []
        
        for i in range(0, len(result)):
            nome.append(result[i][1])
            descricao.append(result[i][4])

        query = "SELECT  Magia,Nivel,descriçao FROM magic" ;        
        cursor.execute(query);      
        result = cursor.fetchall()  

        nomeG = []
        descriG = []
        for i in range(0, len(result)):
            nomeG.append(result[i][0])
            descriG.append(result[i][2])  
        
        response = {
           "nome": nome, 
           "descricao": descricao,
           "nGerais": nomeG,
           "descriGerais": descriG
        }


        return response        

        
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

    def getModifyDice(Classe):
        conn = Conn.connect_todb();
        cursor = conn.cursor();
        
        query = "SELECT dice FROM classe WHERE Classe='"+Classe+"'";
        cursor.execute(query);
        result = cursor.fetchall();

        return result
    
    def getPersona(Id):

        conn = Conn.connect_todb();
        cursor = conn.cursor();
        
        query = "SELECT Nome FROM view_persona_stats WHERE Criado_por="+Id;
        cursor.execute(query);
        result = cursor.fetchall();

        return result
    
    def removerCarectere(string):
        path = re.sub(r'^.*?\\public', '', string)
        path = path.replace('\\', '/')
        return path
    
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
             },          
             "Path": Persona.removerCarectere(data[12]) 
         }   

         return result;

    def uploadImagem(img,user):           
        nome_do_arquivo = img.filename        
        imagem = Image.open(img)

        path = 'C:\\Users\\tkdho\\Desktop\\Programação\\software_tkd\\Front\\rpg\\public\\Source\\'+nome_do_arquivo        
        imagem.save(path)     

        conn = Conn.connect_todb();
        cursor = conn.cursor();

        query = "INSERT INTO picture(Id,Foto,Criado_por,Modificado_por) values(%s,%s,%s,%s)"
        values = (user, path,1,1)
        cursor.execute(query,values);  
        conn.commit();
       
        return path
    


    def getClasse():

        conn = Conn.connect_todb()
        cursor = conn.cursor()

        query = "SELECT Classe FROM classe"
        cursor.execute(query)

        resultC = cursor.fetchall()

        query = "SELECT Raça FROM raça"
        cursor.execute(query)

        resultR = cursor.fetchall()    

        
        query = "SELECT habilidade FROM skills"
        cursor.execute(query)

        resultS = cursor.fetchall()     
        
        data = {
            "Classe": resultC,
            "Raça": resultR,
            "Habilidades": resultS
        }
        
       
        return data
 
        
         
