import requests
import pika
import random
import time
import threading

# Configurações do RabbitMQ
RABBITMQ_API = "http://localhost:15672/api/users"
RABBITMQ_VHOST_API = "http://localhost:15672/api/permissions/%2F"
RABBITMQ_VHOST = "%2F"
RABBITMQ_HOST = "localhost"
USERNAME = "admin"
PASSWORD = "admin"
NUM_USERS = 5

# Criar usuários no RabbitMQ
def create_user(username):
    url = f"{RABBITMQ_API}/{username}"
    user_data = {"password": "password", "tags": ""}
    response = requests.put(url, json=user_data, auth=(USERNAME, PASSWORD))
    if response.status_code in [200, 201, 204]:
        print(f"Usuário {username} criado com sucesso.")
    elif response.status_code == 400:
        print(f"Usuário {username} já existe.")
    else:
        print(f"Erro ao criar usuário {username}: {response.text}")
    
    # Conceder permissões ao vhost
    permissions_url = f"{RABBITMQ_VHOST_API}/{username}"
    permissions_data = {"configure": ".*", "write": ".*", "read": ".*"}
    response = requests.put(permissions_url, json=permissions_data, auth=(USERNAME, PASSWORD))
    if response.status_code in [200, 201, 204]:
        print(f"Permissões concedidas ao usuário {username} no vhost /")
    else:
        print(f"Erro ao conceder permissões para {username}: {response.text}")

# Criar conexões e canais
def create_connections_and_channels(username):
    connections = []
    num_connections = random.randint(1, 5)
    for _ in range(num_connections):
        try:
            connection = pika.BlockingConnection(
                pika.ConnectionParameters(
                    host=RABBITMQ_HOST,
                    credentials=pika.PlainCredentials(username, "password"),
                    client_properties={"connection_name": f"connection of {username}"},
                    heartbeat=30,  # Mantém a conexão ativa
                    blocked_connection_timeout=300  # Tempo máximo antes de timeout
                )
            )
            connections.append(connection)
            num_channels = random.randint(10, 100)
            for _ in range(num_channels):
                channel = connection.channel()
                channel.queue_declare(queue=f"queue_{username}")
        except Exception as e:
            print(f"Erro ao criar conexão para {username}: {e}")
    return connections

# Criar usuários e abrir conexões
all_connections = []
threads = []

for i in range(NUM_USERS):
    user = f"user_simulate_connection_{i}"
    create_user(user)
    thread = threading.Thread(target=lambda: all_connections.extend(create_connections_and_channels(user)))
    thread.start()
    threads.append(thread)

# Aguarde todas as threads finalizarem
for thread in threads:
    thread.join()

print("Todas as conexões e canais foram criados. Pressione Ctrl+C para encerrar.")

# Mantém conexões ativas enviando mensagens periódicas
def keep_alive():
    while True:
        time.sleep(20)
        for conn in all_connections:
            try:
                if conn.is_closed:
                    print("Reconectando uma conexão fechada...")
                    all_connections.remove(conn)
                    all_connections.extend(create_connections_and_channels("user_simulate_connection"))
                else:
                    channel = conn.channel()
                    channel.basic_publish(exchange='', routing_key='keep_alive', body='ping')
                    print("Keep-alive enviado")
            except Exception as e:
                print(f"Erro no keep-alive: {e}")
                all_connections.remove(conn)
                all_connections.extend(create_connections_and_channels("user_simulate_connection"))

# Iniciar thread de keep-alive
keep_alive_thread = threading.Thread(target=keep_alive, daemon=True)
keep_alive_thread.start()

# Manter as conexões abertas
try:
    while True:
        time.sleep(10)
except KeyboardInterrupt:
    print("Encerrando conexões...")
    for conn in all_connections:
        if conn.is_open:
            conn.close()
    print("Finalizado.")
