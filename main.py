import mysql.connector;
from mysql.connector import Error;

class Conn:

    @staticmethod
    def connect_todb():
        conn = None;
        try:    
            conn = mysql.connector.connect(
                host='localhost',        
                database='tkd_software_rpg',
                user='root',
                password=''
            )
            if conn.is_connected():
                db_info = conn.get_server_info()
                print(f"Conectado ao servidor MySQL versão {db_info}")
                cursor = conn.cursor()
                cursor.execute("select database();")
                db_name = cursor.fetchone()
                print(f"Conectado ao banco de dados {db_name}")
                return conn;
        except Error as e:
            print("Nope {e}");    

    @staticmethod
    def insertMagic():
        conn = Conn.connect_todb();
        cursor = conn.cursor();
        query = "INSERT INTO magic(Id,Nome,Nivel,Grupo,Truque,Criado_por,Modificado_por) VALUES (%s,%s,%s,%s,%s,%s,%s)";
        values = (1,'teste','teste','teste',0,1,1);
        cursor.execute(query,values);

        conn.commit();    
        


if __name__ == '__main__':
    Conn.connect_todb();
        