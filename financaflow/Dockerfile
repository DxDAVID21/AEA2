# Base
FROM node:22-alpine AS base
RUN apk add --no-cache openssl

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
COPY prisma ./prisma
RUN npm ci --prefer-offline --no-audit

# Builder
FROM deps AS builder
WORKDIR /app
# Copy all source files
COPY . .
# Generate Prisma client and prepare Nuxt
RUN npm run postinstall
# Build Nuxt application
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nuxtjs

# Copy built application from builder
COPY --from=builder --chown=nuxtjs:nodejs /app/.output ./

# Copy Prisma schema and generated client
COPY --from=builder --chown=nuxtjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nuxtjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nuxtjs:nodejs /app/node_modules ./

# Copy entrypoint script
COPY --chown=nuxtjs:nodejs scripts/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Switch to non-root user
USER nuxtjs

EXPOSE 3000

ENTRYPOINT ["/entrypoint.sh"]
CMD ["node", "./server/index.mjs"]
