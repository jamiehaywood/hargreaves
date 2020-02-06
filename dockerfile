FROM node:10.13-alpine
ENV NODE_ENV production
WORKDIR /src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent
COPY . .
RUN npm run build
EXPOSE 5000
CMD npm start 