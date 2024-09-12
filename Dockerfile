FROM node:16

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4000

CMD ["node", "dist/server.js"]
