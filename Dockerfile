# ╔═══════════════════════════╗
# ║          Bulder           ║
# ╚═══════════════════════════╝
FROM node:22-alpine AS deps

WORKDIR /app

COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --omit=dev

# ╔═══════════════════════════╗
# ║          Runtime          ║
# ╚═══════════════════════════╝
FROM node:22-alpine

ENV NODE_ENV=production
WORKDIR /app
USER node

COPY --from=deps --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node package.json server.js ./
COPY --chown=node:node src ./src

EXPOSE 3000

# HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
#   CMD node -e "require('http').get('http://127.0.0.1:3000/health', (res) => process.exit(res.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1));"

CMD ["node", "server.js"]