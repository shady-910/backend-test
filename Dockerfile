FROM node:14-alpine as base

WORKDIR /src
COPY package.json ./
COPY yarn.lock ./
EXPOSE 3002

FROM base as production
ENV NODE_ENV=production
RUN yarn
COPY . /
CMD ["node", "src/app.js"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && yarn
COPY . /
CMD ["nodemon", "src/app.js"]