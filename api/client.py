import socket

client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client.connect(('localhost', 8888))

close = False

while not close:
    client.send(input('Mensagem:').encode('utf-8'))
    msg = client.recv(1024).decode('utf-8')
    print(msg)

client.close()   