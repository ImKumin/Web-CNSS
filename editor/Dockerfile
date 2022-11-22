FROM node:16.13.1
WORKDIR /

COPY package.json .

RUN npm rebuild node-sass
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]