FROM node:9.8

WORKDIR /usr/src/app

COPY . .

RUN cd client && npm install
RUN cd server && npm install

RUN npm install -g nodemon

EXPOSE 3000 5000

RUN chown -R 1001:1001 /usr/src/app
USER 1001

WORKDIR /usr/src/app/server
CMD ["yarn", "dev"]