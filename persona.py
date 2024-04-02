from main import Conn;
from dice import Dice;

class Priest:   
    
    def __init__(self, nome, nivel, raca, classe):
        self.nome = nome;
        self.nivel = nivel
        self.raca = raca;
        self.classe = classe;
        if nivel == "1":
            self.vida = 8;
            return
        else:
            self.vida = 8 +  Dice.rollD6(8,nivel); 
    
    def calcModify(number):
        modify = 0;

        if number == 1: 
            modify = -5
        
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
        
    

    @staticmethod
    def insertStatus(data, name, vida):
        status = []
        status = data;
        nome = name

        iniciativa = Priest.calcModify(int(data["des"]))

        try:
            conn = Conn.connect_todb();
            cursor = conn.cursor();  
            query = "SELECT Id FROM persona WHERE Nome='" + nome +"' ORDER BY Data_criacao ASC";        
            cursor.execute(query);
            Id = cursor.fetchone();           
        
            query = "INSERT INTO status(Id,Vida,Iniciativa,Força,Destreza,Carisma,Inteligência,Sabedoria,Criado_por,Modificado_por) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)";
            values = (Id[0],vida,iniciativa,status["str"],status["des"],status["char"],status["int"],status["sab"],1,1);
            cursor.execute(query,values); 

            conn.commit();         
        except:
            print("Ocorreu algum erro")

    @staticmethod
    def insertPersona(infos):
        data = [];
        data = infos["persona"]

        
        dataStats = []        
        dataStats = infos["status"]  

        persona = Priest(data["nome"],data["nivel"],data["raça"],data["classe"]);

        try:
            conn = Conn.connect_todb();
            cursor = conn.cursor();
            query = "INSERT INTO persona(Nome,Nivel,Raça,Classe,Criado_por,Modificado_por) VALUES (%s,%s,%s,%s,%s,%s)";
            values = (persona.nome,persona.nivel,persona.raca,persona.classe,1,1);
            cursor.execute(query,values);
            conn.commit();

            Priest.insertStatus(dataStats, data["nome"], persona.vida);
        except:
            print('Algum erro ocorreu')        

        



 