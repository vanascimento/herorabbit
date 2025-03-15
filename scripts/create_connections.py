import pika
import random
import json
import time
import requests
from requests.auth import HTTPBasicAuth
import signal
import sys

# Configurações do RabbitMQ
RABBITMQ_HOST = 'localhost'
RABBITMQ_ADMIN_USER = 'admin'
RABBITMQ_ADMIN_PASS = 'admin'
RABBITMQ_API_URL = f'http://{RABBITMQ_HOST}:15672/api'
HEADERS = {'Content-Type': 'application/json'}

# Função para criar usuários no RabbitMQ via API HTTP
def create_user(username, password):
    url = f"{RABBITMQ_API_URL}/users"
    payload = {
        "username": username,
        "password": password,
        "tags": "administrator"  # Ou "monitoring" ou qualquer outro tipo de permissão, conforme necessário
    }
    response = requests.post(url, auth=HTTPBasicAuth(RABBITMQ_ADMIN_USER, RABBITMQ_ADMIN_PASS), headers=HEADERS, json=payload)

    if response.status_code == 201:
        print(f"✅ Usuário {username} criado com sucesso!")
    else:
        print(f"❌ Falha ao criar usuário {username}: {response.text}")

# Função para criar e manter conexões no RabbitMQ usando pika
def create_connections(username, num_connections):
    connections = []
    for _ in range(num_connections):
        credentials = pika.PlainCredentials(username, username)  # Supondo que a senha seja igual ao nome de usuário
        connection = pika.BlockingConnection(pika.ConnectionParameters(host=RABBITMQ_HOST, credentials=credentials))
        connections.append(connection)
        print(f"🔗 Conexão criada para o usuário {username}")

    return connections

# Função para capturar o sinal de interrupção (Ctrl+C) e fechar conexões corretamente
def signal_handler(signal, frame):
    print("\n🔴 Interrompendo o script. Fechando as conexões...")
    for connection in connections_all:
        for conn in connection:
            conn.close()
    print("✅ Todas as conexões fechadas. Script finalizado.")
    sys.exit(0)

# Registra o sinal de interrupção para capturar Ctrl+C
signal.signal(signal.SIGINT, signal_handler)

# Lista para armazenar todas as conexões
connections_all = []

# Criar 10 usuários
for i in range(1, 11):
    username = f"user_{i}"
    password = f"{username}_password"
    
    # Criar usuário no RabbitMQ via API
    create_user(username, password)
    
    # Criar entre 5 e 50 conexões para cada usuário
    num_connections = random.randint(5, 50)
    connections = create_connections(username, num_connections)
    connections_all.append(connections)

    print(f"✅ Conexões abertas para o usuário {username}, aguardando Ctrl+C para finalizar.\n")

# Manter o script rodando até o usuário interromper
print("\n🎯 Script em execução. Pressione Ctrl+C para interromper.")
while True:
    time.sleep(1)  # Mantém o script rodando sem consumir muita CPU
