
import asyncio
import websockets

# Função do servidor WebSocket
async def server(websocket, path):
    try:
        while True:
            # Aguarda uma mensagem do cliente
            mensagem = await websocket.recv()
            print(f"Mensagem recebida do cliente: {mensagem}")

            # Envia uma mensagem de volta para o cliente
            resposta = input('Digite algo para o Front')
            await websocket.send(resposta)
    except websockets.exceptions.ConnectionClosed as e:
        print(f"Conexão fechada: {e}")
    except Exception as e:
        print(f"Erro: {e}")
    finally:
        # Se necessário, faça alguma limpeza ou log
        print("Conexão finalizada ou erro ocorrido.")
        
# Inicia o servidor WebSocket
async def start_server():
    async with websockets.serve(server, 'localhost', 8000):
        print("Servidor WebSocket iniciado")
        await asyncio.Future()  # Mantém o servidor em execução

# Função principal
def main():
    asyncio.run(start_server())

if __name__ == "__main__":
    main()



  