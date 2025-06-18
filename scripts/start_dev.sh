#!/bin/bash

# Check if docker service is running
if ! docker info >/dev/null 2>&1; then
  echo "Error: Docker is not running. Please start Docker and try again."
  exit 1
fi

SUPABASE_ENV_PATH="./packages/supabase/.env"
SUPABASE_ENV_EXAMPLE_PATH="./packages/supabase/.env.example"

# Check if .env file exists in supabase directory, if not copy .env.example to .env with prompt message
if [ ! -f "$SUPABASE_ENV_PATH" ]; then
  echo ".env file not found in packages/supabase."
  if [ -f "$SUPABASE_ENV_EXAMPLE_PATH" ]; then
    cp "$SUPABASE_ENV_EXAMPLE_PATH" "$SUPABASE_ENV_PATH"
    echo "Copied .env.example to .env in packages/supabase. Please review and update secrets before production."
  else
    echo "Error: .env.example not found in packages/supabase. Cannot proceed."
    exit 1
  fi
fi

# Start supabase services
echo "Starting Supabase services..."
docker compose -f ./packages/supabase/docker-compose.yml up -d
if [ $? -ne 0 ]; then
  echo "Error: Failed to start Supabase services."
  exit 1
fi
echo "Supabase services started successfully."

# Start frontend and backend services
echo "Starting frontend and backend services..."
docker compose -f compose.dev.yml up -d
if [ $? -ne 0 ]; then
  echo "Error: Failed to start frontend/backend services."
  exit 1
fi
echo "Frontend and backend services started successfully."

echo "All development services are up and running."