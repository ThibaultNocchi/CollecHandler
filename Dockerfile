FROM node:lts-alpine AS client

WORKDIR /app
ARG VITE_VERSION
ENV VITE_VERSION=$VITE_VERSION
COPY client .
RUN npm ci --no-audit && npm run build

FROM node:lts-alpine AS server

WORKDIR /app
COPY server .
RUN npm ci --no-audit && npm run build


FROM alpine:latest

ENV NODE_ENV=production

RUN apk add --no-cache nginx npm nodejs supervisor

COPY --from=client /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/http.d/default.conf

WORKDIR /server
COPY --from=server /app/dist dist
COPY --from=server /app/package*.json ./
COPY --from=server /app/prisma prisma
COPY schema.graphql /
RUN npm ci --no-audit && npm cache clean --force && rm -r /root/.cache package-lock.json /usr/lib/python*/__pycache__

WORKDIR /
COPY supervisord.conf start.sh ./

VOLUME [ "/server/prisma/db" ]

CMD [ "./start.sh" ]
