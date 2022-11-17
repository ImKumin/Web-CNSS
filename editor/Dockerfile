FROM node:16.13.1
WORKDIR /

COPY . .

ENV PATH /node_modules/.bin:$PATH

EXPOSE 3000

RUN npm rebuild node-sass
RUN npm install
CMD ["npm", "start"]