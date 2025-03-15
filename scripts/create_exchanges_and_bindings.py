import pika
import random
import json

# Configurações do RabbitMQ
RABBITMQ_HOST = 'localhost'
RABBITMQ_USER = 'admin'
RABBITMQ_PASS = 'admin'

# Definições
NUM_EXCHANGES = 5
NUM_QUEUES = 200  # Alterado de 10 para 200
EXCHANGE_TYPES = ['direct', 'fanout', 'topic']

# Chaves aleatórias para simular transações financeiras
TRANSACTION_KEYS = ["transaction_id", "amount", "currency", "timestamp", "status", "sender", "receiver", "location", "payment_method", "description"]

# Conectar ao RabbitMQ
credentials = pika.PlainCredentials(RABBITMQ_USER, RABBITMQ_PASS)
connection = pika.BlockingConnection(pika.ConnectionParameters(host=RABBITMQ_HOST, credentials=credentials))
channel = connection.channel()

# Criar exchanges
exchanges = []
for i in range(NUM_EXCHANGES):
    exchange_name = f"exchange_{i+1}"
    exchange_type = random.choice(EXCHANGE_TYPES)  # Tipo aleatório
    channel.exchange_declare(exchange=exchange_name, exchange_type=exchange_type, durable=True)
    exchanges.append(exchange_name)
    print(f"✅ Exchange criada: {exchange_name} ({exchange_type})")

# Criar filas
queues = []
for i in range(NUM_QUEUES):
    queue_name = f"queue_{i+1}"
    channel.queue_declare(queue=queue_name, durable=True)
    queues.append(queue_name)
    print(f"✅ Fila criada: {queue_name}")

# Criar bindings aleatórios entre exchanges e filas
for queue in queues:
    num_bindings = random.randint(1, 3)  # Cada fila terá entre 1 e 3 bindings
    for _ in range(num_bindings):
        exchange = random.choice(exchanges)
        routing_key = f"key_{random.randint(1, 100)}"  # Chave de roteamento aleatória
        channel.queue_bind(exchange=exchange, queue=queue, routing_key=routing_key)
        print(f"🔗 Binding criado: {exchange} -> {queue} (routing_key={routing_key})")

# Gerar e publicar mensagens aleatórias para cada fila
for queue in queues:
    num_messages = random.randint(10, 50000)  # Número aleatório de mensagens de 10 a 50.000
    for _ in range(num_messages):
        transaction = {
            key: random.choice(["12345", "100.50", "USD", "2025-03-05T12:00:00Z", "completed", "user_A", "user_B", "NY", "credit_card", "payment"])
            for key in TRANSACTION_KEYS
        }
        message = json.dumps(transaction)
        channel.basic_publish(exchange='', routing_key=queue, body=message)
    print(f"📩 {num_messages} mensagens enviadas para {queue}")

# Fechar conexão
connection.close()
print("\n🎯 Exchanges, filas e mensagens criadas com sucesso!")
