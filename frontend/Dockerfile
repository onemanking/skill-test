ARG REACT_APP_API_URL

FROM node:22-alpine AS base

ENV REACT_APP_API_URL=${REACT_APP_API_URL}

WORKDIR /app

COPY package.json yarn.lock* .npmrc* ./

RUN yarn --frozen-lockfile

COPY . .

EXPOSE 5173

CMD ["yarn", "dev"]