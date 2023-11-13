FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install

ENTRYPOINT ["npm"]

CMD ["start"]
