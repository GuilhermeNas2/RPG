from main import Conn


class Login:    

    def searchLogin():

        conn = Conn.connect_todb();
        cursor = conn.cursor;

        query = "SELECT user, senha FROM user"
        return "o"
    