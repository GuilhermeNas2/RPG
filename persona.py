from main import Conn;

class Priest:   
    
    def __init__(self, nome, nivel, raca, vida):
        self.nome = nome;
        self.nivel = nivel
        self.raca = raca;
        self.classe = "Clérigo";
        self.vida = 8 + vida;  
    
    def insertStatus(data):
        status = []
        status = data;
        nome = status["nome"]

        conn = Conn.connect_todb();
        cursor = conn.cursor();  
        query = "SELECT Id FROM persona WHERE Nome='" + nome +"'";        
        cursor.execute(query);
        Id = cursor.fetchone();           
       
        query = "INSERT INTO status(Id,Vida,Iniciativa,Força,Destreza,Carisma,Inteligência,Sabedoria,Criado_por,Modificado_por) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)";
        values = (Id[0],10,10,status["str"],status["des"],status["char"],status["int"],status["sab"],1,1);
        cursor.execute(query,values); 

        conn.commit();         

    @staticmethod
    def insertPersona(nome, nivel, raca):
        persona = Priest(nome,nivel,raca);

        conn = Conn.connect_todb();
        cursor = conn.cursor();
        query = "INSERT INTO persona(Nome,Nivel,Raça,Classe,Criado_por,Modificado_por) VALUES (%s,%s,%s,%s,%s,%s)";
        values = (persona.nome,persona.nivel,persona.raca,persona.classe,1,1);
        cursor.execute(query,values);
        

        conn.commit(); 



 