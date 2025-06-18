FROM python:3.12-slim

WORKDIR /app

COPY apps/api /app/
COPY apps/api/requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5555