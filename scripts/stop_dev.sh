#!/bin/bash

echo "Stopping frontend and backend services..."
docker compose -f compose.dev.yml down

echo "Stopping Supabase services..."
docker compose -f ./packages/supabase/docker-compose.yml down

echo "All development services have been stopped."

