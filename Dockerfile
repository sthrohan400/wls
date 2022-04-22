FROM node:14
# Install Nest JS
RUN npm i -g @nestjs/cli --force
RUN npm install -g yarn --force

WORKDIR /usr/app
COPY package.json yarn.lock /usr/app/
RUN npm install
RUN yarn

COPY . .
