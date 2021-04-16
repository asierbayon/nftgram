FROM node:15.14.0-alpine3.13

COPY api /opt/api
WORKDIR /opt/api

RUN npm ci --only=production

CMD [ "npm", "start" ]