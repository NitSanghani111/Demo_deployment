#!/bin/bash

echo "Stopping and removing containers, networks, and volumes..."
docker-compose down -v --rmi local

echo "Pruning unused Docker resources..."
docker system prune -f

echo "Cleanup complete!"
