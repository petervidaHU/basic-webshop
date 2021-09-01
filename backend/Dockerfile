FROM node:16-alpine

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

ENV PORT=3001
ENV SECRET_KEY=aiculedssul
ENV SECRET_EXP=1d
ENV MONGO_USER=petervidaHU:aaabbb111222
ENV MONGO_DB_TEST=myTestDatabase
ENV MONGO_DB_DEV=myFirstDatabase

CMD ["yarn","start"]