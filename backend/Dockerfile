# syntax=docker/dockerfile:1.7

FROM node:20-alpine AS deps

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev --ignore-scripts

FROM node:20-alpine AS runtime

WORKDIR /app
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./
COPY --chown=node:node db.json ./

USER node

EXPOSE 5000
CMD ["npm", "run", "server"]
