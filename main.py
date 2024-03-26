import mysql.connector;
from mysql.connector import Error;

class Conn:
    def connect_todb():
        connection = None;
        try:    
            connection = mysql.connector.connect(
                host='localhost',        
                database='tkd_software_rpg',
                user='root',
                password=''
            )
            if connection.is_connected():
                db_info = connection.get_server_info()
                print(f"Conectado ao servidor MySQL versão {db_info}")
                cursor = connection.cursor()
                cursor.execute("select database();")
                db_name = cursor.fetchone()
                print(f"Conectado ao banco de dados {db_name}")
        except Error as e:
            print("Nope {e}");    


    if __name__ == '__main__':
        connect_todb();
        