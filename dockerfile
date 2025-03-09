FROM node:18-alpine

WORKDIR /app
RUN npm i -g pnpm
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install 

WORKDIR /app/apps/backend

COPY apps/backend .

RUN pnpm install



WORKDIR /app/packages/firebase
COPY packages/firebase .

RUN pnpm install

WORKDIR /app/apps/frontend

COPY apps/frontend .

RUN pnpm install 
RUN pnpm run build  

WORKDIR /app
RUN pnpm --filter firebase run build

EXPOSE 5173
EXPOSE 3000
CMD ["pnpm", "run","dev"]
