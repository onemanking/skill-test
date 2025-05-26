# syntax=docker.io/docker/dockerfile:1

# Define build arguments
ARG DATABASE_URL

FROM node:22-alpine AS base

# Set environment variables for all stages
ENV DATABASE_URL=${DATABASE_URL}

# Install dependencies only when needed
RUN apk --no-cache add --virtual virtual-deps libc6-compat pkgconfig pixman-dev \
g++ gcc libgcc libstdc++ linux-headers make python3 py3-pip && \
npm install --quiet node-gyp -g 
RUN apk add --no-cache openssl chromium curl

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* .npmrc* ./
RUN yarn --frozen-lockfile

COPY . .

RUN npx prisma generate
RUN NODE_OPTIONS="--max-old-space-size=4096" yarn build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=dev

# Set runtime environment variables
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Automatically leverage output traces to reduce image size
COPY --from=base /app/prisma ./prisma

EXPOSE 3000

# Start the server
# CMD ["node", "./dist/server.js"]
CMD ["yarn", "start"]
