FROM node:18

WORKDIR /usr/src/app

# ENV PORT 2000

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production

COPY . .

RUN yarn build

CMD yarn start

EXPOSE 2000