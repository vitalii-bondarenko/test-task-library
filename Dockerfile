FROM node:12-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci

EXPOSE 3000

COPY . .

CMD ["npm", "run", "start-server"]
