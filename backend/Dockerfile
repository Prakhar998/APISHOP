FROM node:alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}
CMD ["npm","start"]