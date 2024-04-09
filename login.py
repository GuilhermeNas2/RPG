import os
import smtplib
from main import Conn
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

class Login:    

    def searchLogin(nome, key):

        conn = Conn.connect_todb();
        cursor = conn.cursor();

        query = "SELECT Id,user, senha FROM user WHERE user='"+nome+"'"; 
        cursor.execute(query);
        result = cursor.fetchone();

        user = result[1]
        senha = result[2]
        
        if user == nome and key == senha:             
            return result 
        
    def createUser(keys):
        info = keys["data"]
        print(info)

        conn = Conn.connect_todb();
        cursor = conn.cursor();

        query = "SELECT user FROM user WHERE user='"+info["name"]+"'"
        cursor.execute(query)
        result = cursor.fetchone()
        
        if result[0] == info["name"]:
            print("Nome de usuário ja em uso")
            return
        
        query = "SELECT email FROM user WHERE email='"+info["email"]+"'"
        cursor.execute(query)
        result = cursor.fetchone()

        if result[0] == info["email"]:
            print("Email ja em uso")
            return     

        try:
            query = "INSERT INTO user(user, senha, email, Criado_por, Modificado_por) Values (%s,%s,%s,%s,%s)"
            values = (info["name"], info["key"], info["email"], 1, 1)
            cursor.execute(query, values)

            conn.commit();
            Login.sendEmail(info["email"]);
        
        except:
            print("Deu merda")

        return 
    
    def sendEmail(email):
        # password = os.environ.get("EMAIL_PASSWORD")
        password = 'ctby glbf qjda azwf'

        smtp_server = "smtp.gmail.com"
        port = 465
        sender_email = "tkdhouse2@gmail.com"
        receiver_email = email
        
        # Crie a mensagem de email
        message = MIMEMultipart("alternative")
        message["Subject"] = "Verificação de Email"
        message["From"] = sender_email
        message["To"] = email

        # Crie a versão HTML da sua mensagem
        html = """\
        <html>
        <body>
            <p>Olá,<br>
            Como vai?<br>
            <a href="http://www.realpython.com">Real Python</a> 
            tem muitos ótimos tutoriais.
            </p>
        </body>
        </html>
        """
        # Adicione o HTML ao MIMEText e ao MIMEMultipart
        part = MIMEText(html, "html")
        message.attach(part)

        try:
            with smtplib.SMTP_SSL(smtp_server, port) as server:
                server.login(sender_email, password)
                server.sendmail(sender_email, receiver_email, message.as_string())
           
        except Exception as e:
            print(f"Deu errado {e}")

        finally:
            server.quit()

