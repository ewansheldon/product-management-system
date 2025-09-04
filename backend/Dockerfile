FROM node:22.19.0-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --only=development
COPY . .
RUN npm run build

FROM node:22.19.0-slim AS run
WORKDIR /app
RUN apt-get update && apt-get install -y tini
ENTRYPOINT ["/usr/bin/tini", "--"]
COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm install --only=production
EXPOSE 3000
CMD ["node", "dist/src/api/app.js"]