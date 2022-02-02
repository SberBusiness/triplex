FROM registry.sigma.sbrf.ru/ci00149046/ci00405008_sbbolufs/node:12-alpine AS build

COPY .npmrc ./package.json ./package-lock.json /app/
WORKDIR /app
RUN npm ci

COPY . /app

ARG NODE_ENV
ARG STYLEGUIDIST_SETTINGS_MODE=false
RUN /bin/sh -c '[[ "${NODE_ENV}" == "production" ]] && npm run styleguidist:build || npm run styleguidist:build:dev'

FROM registry.sigma.sbrf.ru/ci00149046/ci00405008_sbbolufs/nginx:1.18.0
COPY --from=build /app/styleguidistDist /usr/share/nginx/html
