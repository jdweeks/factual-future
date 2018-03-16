FROM node:9.8

WORKDIR /usr/src/app

COPY . .

RUN cd client && npm install
RUN cd server && npm install

RUN npm install -g nodemon

EXPOSE 80 5000

WORKDIR /usr/src/app/server
CMD ["yarn", "dev"]