FROM node:alpine as builder
WORKDIR /ws
COPY ./ .
RUN npm install
RUN npm run build

FROM nginx:alpine

COPY --from=builder /ws/build /usr/share/nginx/html