from main import Conn
from mysql.connector import Error

class Magic:

    def insertMagic():
        print("oi");

    def getMagic(name):
        magic = name;
        
        try:
            conn = Conn.connect_todb();
            cursor = conn.cursor();
            query = "SELECT * FROM persona_magic WHERE Magia='"+magic+"'";
            cursor.execute(query);
            result = cursor.fetchone();

            if result != None:
                print("Você ja possui essa magia");
                return;
        
            query = "SELECT * FROM magic WHERE Magia='"+magic+"'";
            cursor.execute(query);
            result = cursor.fetchone();            

            if result != None:
                query = "INSERT INTO persona_magic(Id, Magia, Criado_por, Modificado_por) VALUES (%s,%s,%s,%s)"
                values = (2, magic, 1, 1);
                cursor.execute(query, values);

                conn.commit();
                conn.close();
                print(result)

        except Error as e:
            print("error--->{e}");

Magic.getMagic('teste');