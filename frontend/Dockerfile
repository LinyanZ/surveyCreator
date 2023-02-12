FROM node:lts-alpine
WORKDIR /frontend
COPY package.json .
RUN npm i
COPY . .
EXPOSE 5000
CMD ["npm", "run", "dev"]