FROM node:lts-alpine AS client

WORKDIR /app
COPY client .
RUN npm ci --no-audit && npm run build

FROM node:lts-alpine AS server

WORKDIR /app
COPY server .
RUN npm ci --no-audit && npm run build


FROM alpine:latest

ENV NODE_ENV=production

RUN apk add nginx npm nodejs supervisor

COPY --from=client /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/http.d/default.conf

WORKDIR /server
COPY --from=server /app/dist dist
COPY --from=server /app/package*.json ./
COPY --from=server /app/prisma prisma
COPY schema.graphql /
RUN npm ci --no-audit

WORKDIR /
COPY supervisord.conf ./
COPY start.sh ./
RUN chmod +x start.sh

VOLUME [ "/server/prisma/db" ]

CMD [ "./start.sh" ]
