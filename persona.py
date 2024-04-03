from classe import Persona
from main import Conn;
from dice import Dice;
from mysql.connector import Error;

class Priest(Persona):   
    
    def __init__(self, nome, nivel, raca, classe):
        self.nome = nome;
        self.nivel = nivel
        self.raca = raca;
        self.classe = classe;
        if nivel == "1":
            self.vida = 8;
            return
        else:
            self.vida = 8 + Dice.rollD6(8,nivel); 

    
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
            values = (Id[0],vida,iniciativa,status["str"],status["des"],status["char"],status["int"],status["sab"],1,1);
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

        persona = Priest(data["nome"],data["nivel"],data["raça"],data["classe"]);

        try:
            conn = Conn.connect_todb();
            cursor = conn.cursor();
            query = "INSERT INTO persona(Nome,Nivel,Raça,Classe,Criado_por,Modificado_por) VALUES (%s,%s,%s,%s,%s,%s)";
            values = (persona.nome,persona.nivel,persona.raca,persona.classe,1,1);
            cursor.execute(query,values);
            conn.commit();

            Priest.insertStatus(dataStats, data["nome"], persona.vida);
        except Error as e:
            print('Algum erro ocorreu e')        

        



 