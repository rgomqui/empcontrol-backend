FROM node:18-alpine3.15 AS deps

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build


FROM node:18-alpine3.15 AS runner

WORKDIR /app

COPY package.json ./

RUN npm install --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["npm", "start"]