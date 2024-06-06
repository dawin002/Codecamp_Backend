FROM node:18

COPY ./package.json /myFolder/
COPY ./docker-compose.yaml /myFolder/

WORKDIR /myFolder/
RUN yarn install

COPY . /myFolder/

CMD yarn start:dev