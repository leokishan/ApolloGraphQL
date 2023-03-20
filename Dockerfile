FROM node:16-alpine

ENV DATABASE_URL=postgresql://USERNAME:PASSWORD@DB_URL:DB_PORT/DB_DATABASE
WORKDIR /usr/src/application
COPY package.json ./
RUN npm install
COPY . .
RUN npm run compile
RUN npx prisma generate

EXPOSE 4000

CMD ["npm", "run", "start:prod"]