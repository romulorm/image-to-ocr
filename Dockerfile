FROM node:lts-bullseye
ENV NODE_ENV=production
ENV TZ="America/Sao_Paulo"
USER root
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
COPY . .
COPY --chown=node:node . .
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y tesseract-ocr tesseract-ocr-por
RUN npm install --location=global npm@latest
RUN npm install --production --silent
EXPOSE 3001
USER node
CMD ["npm", "start"]