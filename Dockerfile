FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start", "0.0.0.0:3000"]
