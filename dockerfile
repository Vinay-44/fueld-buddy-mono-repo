FROM node:18-alpine AS base
WORKDIR /app

COPY package.json pnpm-lock.yaml ./ 
RUN corepack enable && pnpm install --frozen-lockfile

FROM base AS backend
WORKDIR /app/apps/backend

COPY packages ./packages
COPY apps/backend ./ 

RUN pnpm install --frozen-lockfile

EXPOSE 3000

CMD ["pnpm", "start"]


FROM base AS frontend
WORKDIR /app/apps/frontend

COPY apps/frontend ./
COPY packages ./packages

RUN pnpm install 
RUN pnpm run build  

EXPOSE 5173

CMD ["pnpm", "preview"]
