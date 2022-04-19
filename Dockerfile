# Step 1

FROM node:alpine as build-step

RUN mkdir /app

WORKDIR /app

COPY package.json ./


COPY . ./
RUN npm install --legacy-peer-deps

RUN npm run build

CMD ["npm", "run", "start"]

# Stage 2
FROM nginx:1.17.1-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-step /app/build /usr/share/nginx/html
EXPOSE 80 
CMD ["nginx", "-g", "daemon off;"]
