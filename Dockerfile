FROM node:20.3.0-slim AS packages
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
WORKDIR /app
RUN npm install

FROM node:20.3.0-slim
COPY --from=packages /app /app
COPY . /app
WORKDIR /app
RUN npm run build
CMD ["node", "dist/main.js"]