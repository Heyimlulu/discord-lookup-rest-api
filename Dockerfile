FROM node:alpine

EXPOSE 8080

WORKDIR /usr

COPY package.json ./
COPY tsconfig.json ./
COPY tsoa.json ./
COPY src ./src

RUN yarn install
RUN yarn add ts-node
RUN yarn run build

# Bundle app source
COPY . .

CMD [ "yarn", "start"]
