FROM node:12
WORKDIR .
CMD ['npm ci', 'npm run start-server']
