FROM node:9.8

WORKDIR /usr/src/app

COPY . .

RUN cd client && npm install
RUN cd ../server && npm install

EXPOSE 3000 5000

CMD ["yarn", "dev"]