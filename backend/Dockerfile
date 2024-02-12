# 🚧 Base stage
# ---------------------------------------
FROM node:alpine AS base
LABEL authors="TarVic"

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# 📢 Callable stage
# ---------------------------------------
FROM base AS callable

COPY docker-entrypoint.sh\
 nest-cli.json\
 package.json\
 tsconfig*.json\
 wait-for-it.sh\
 yarn.lock\
 ./

# Set executable
RUN chmod +x ./wait-for-it.sh ./docker-entrypoint.sh

# Install tools required for project
# Run `docker build --no-cache .` to update dependencies
RUN apk add --no-cache bash

# ✨🧑‍💻 Devs stage
# ---------------------------------------
FROM base AS devs

COPY nest-cli.json tsconfig*.json package.json yarn.lock ./
#RUN yarn --frozen-lockfile --network-timeout 100000 && yarn cache clean
RUN yarn --frozen-lockfile && yarn cache clean

COPY patches/ ./patches/
RUN patch-package

# ✨🚀 Prods stage
# ---------------------------------------
FROM devs AS prods

COPY src/ ./src/
RUN yarn build

RUN rm -rf ./node_modules
#RUN yarn --production --frozen-lockfile --network-timeout 100000 && yarn cache clean
RUN yarn --production --frozen-lockfile && yarn cache clean

COPY patches/ ./patches/
RUN patch-package

# 🧑‍💻 Development stage
# ---------------------------------------
FROM callable AS development

COPY ".env.development.local" ./
COPY --from=devs /app/node_modules ./node_modules/

# 🔧 Test stage
# ---------------------------------------
FROM callable AS debug

COPY ".env.debug.local" ./
COPY --from=devs /app/node_modules ./node_modules/

RUN yarn test && yarn lint

# 🚀 Production stage
# ---------------------------------------
FROM callable AS production

COPY ".env.production.local" ./

COPY --from=prods /app/dist ./dist/
COPY --from=prods /app/node_modules ./node_modules/