from main import Conn

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
    

     def getPersona(name):
         
         persona = name;

         conn = Conn.connect_todb();
         cursor = conn.cursor();

         query = "SELECT Nome, Classe, Raça, Nivel FROM persona WHERE Nome='"+ name +"'";
         cursor.execute(query);
         result = cursor.fetchone();
         
         return result;
 
        
         
