# stage1 as builder
FROM node:alpine as builder

WORKDIR /app
# copy the package.json to install dependencies
COPY package*.json ./

# Install the dependencies and make the folder
RUN npm install 

COPY . .

RUN npm install -g pm2
# Build the project and copy the files
RUN npm run build

EXPOSE 3000 

CMD [ "pm2-runtime", "npm", "--", "start" ]

#FROM nginx:1.21.0-alpine as production



#ENV NODE_ENV production
# Copy built assets from builder
#COPY --from=builder /app/out /usr/share/nginx/html
# Add your nginx.conf
#COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port

#EXPOSE 80 3000
# Start nginx
#CMD ["nginx", "-g", "daemon off;"]