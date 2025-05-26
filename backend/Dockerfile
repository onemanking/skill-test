# Define build arguments
ARG DATABASE_URL

FROM node:22-alpine AS base

# Set environment variables for all stages
ENV DATABASE_URL=${DATABASE_URL}
ENV NODE_ENV=dev
ENV PORT=3000

# Install dependencies only when needed
RUN apk --no-cache add --virtual virtual-deps libc6-compat pkgconfig pixman-dev \
g++ gcc libgcc libstdc++ linux-headers make python3 py3-pip && \
npm install --quiet node-gyp -g 
RUN apk add --no-cache bash openssl chromium curl
RUN apk add --no-cache postgresql-client

WORKDIR /app
# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* .npmrc* ./
RUN yarn --frozen-lockfile

COPY . .

RUN npx prisma generate
RUN NODE_OPTIONS="--max-old-space-size=4096" yarn build

CMD ["yarn", "start"]
