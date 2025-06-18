FROM node:22-alpine

WORKDIR /app

COPY pnpm-lock.yaml ./
COPY package.json ./
COPY pnpm-workspace.yaml ./

COPY apps/ ./apps/
COPY packages/ ./packages/

RUN corepack enable
RUN pnpm -r install --frozen-lockfile

# WORKDIR /app/apps/web

EXPOSE 3000

CMD ["pnpm", "dev"]