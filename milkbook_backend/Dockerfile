# syntax=docker/dockerfile:1.7
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Pull Prisma schema from sibling milkbook_db/ via BuildKit additional_context.
COPY --from=db /schema.prisma ./prisma/schema.prisma
# Generate the typed client into the backend's node_modules so the runtime import works.
ENV PRISMA_OUTPUT=/app/node_modules/.prisma/client
RUN npx prisma generate --schema=./prisma/schema.prisma && npm run build && npm prune --omit=dev

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
EXPOSE 3000
HEALTHCHECK --interval=15s --timeout=3s --start-period=20s --retries=5 \
  CMD wget -qO- http://127.0.0.1:3000/ > /dev/null || exit 1
CMD ["node", "dist/main.js"]
