
# STAGE 1: BUILDER
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy application source code
COPY server.js ./


# STAGE 2: RUNNER
FROM node:20-alpine AS runner

# Set working directory
WORKDIR /usr/src/app

# Use non-root user
USER node

# Copy installed dependencies from builder
COPY --chown=node:node --from=builder /usr/src/app/node_modules ./node_modules

# Copy application source code
COPY --chown=node:node server.js ./server.js

# Expose application port
EXPOSE 3000

# Start application
CMD ["node", "server.js"]

