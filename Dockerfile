FROM node:12-alpine AS build

COPY . /app/
WORKDIR /app
RUN npm ci

ARG NODE_ENV
ARG STYLEGUIDIST_SETTINGS_MODE=false
RUN /bin/sh -c '[[ "${NODE_ENV}" == "production" ]] && npm run styleguidist:build || npm run styleguidist:build:dev'

FROM nginx:1.18.0
COPY --from=build /app/styleguidistDist /usr/share/nginx/html
