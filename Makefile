# Makefile for HeroRabbit development environment

.PHONY: help up down clean

# Default target
help:
	@echo "Available commands:"
	@echo "  up      - Start docker-compose services"
	@echo "  down    - Stop docker-compose services"
	@echo "  clean   - Clean up docker containers and volumes"

# Start docker-compose services
up:
	@echo "Starting docker-compose services..."
	@cd playground && docker-compose up -d
	@echo "Building exchanges and queues..."
	@cd scripts && python simulate_exchange_queues_and_messages.py
	@echo "Starting connection simulation..."
	@cd scripts && python simulate_connections.py &
	@echo "Starting extension build in watch mode..."
	@cd extension && pnpm run build:watch

# Stop docker-compose services
down:
	@echo "Stopping all services..."
	@pkill -f "python simulate_connections.py" || true
	@echo "Stopping docker-compose services..."
	@cd playground && docker-compose down

# Clean up docker containers and volumes
clean:
	@echo "Cleaning up docker containers and volumes..."
	@cd playground && docker-compose down -v --remove-orphans
	@docker system prune -f
