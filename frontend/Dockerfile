FROM node:22.19.0-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine AS run
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist ./
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]