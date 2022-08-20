FROM node:latest as base
WORKDIR /app
COPY package*.json ./
EXPOSE 3000

FROM base as development
RUN npm install
ENV NODE_ENV development
COPY . .
CMD ["npm", "run", "dev"]

FROM base as production
RUN npm ci
ENV NODE_ENV production
COPY . .
