FROM node:16.13.1
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json package-lock.json ./
RUN npm ci

RUN mkdir -p node_modules/node-sass/vendor/linux-x64-93
RUN curl -L https://github.com/sass/node-sass/releases/download/v7.0.1/linux-x64-93_binding.node -o node_modules/node-sass/vendor/linux-x64-93/binding.node

RUN npm install
RUN npm rebuild node-sass

COPY . .

EXPOSE 3000

CMD ["npm", "start"]