FROM node:18

COPY ./package.json /myFolder/
COPY ./yarn.lock /myFolder/

WORKDIR /myFolder/
RUN yarn install

COPY . /myFolder/

WORKDIR /myFolder/src

CMD yarn start:dev