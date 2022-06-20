FROM node:lts-bullseye
ENV NODE_ENV=production
USER root
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y tesseract-ocr tesseract-ocr-por
RUN npm install --production --silent
COPY . .
COPY --chown=node:node . .
EXPOSE 3000
USER node
CMD ["npm", "start"]
