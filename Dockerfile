FROM node:10

WORKDIR /usr/tweety

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run","container" ]