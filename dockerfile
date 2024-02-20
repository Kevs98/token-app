# select the node.js image to use 
FROM mongo:latest

# node version
ENV NODE_VERSION 21

# Install Node.js y npm
RUN apt-get update && \
    apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash - && \
    apt-get install -y nodejs 

# Install compilation tools
RUN apt-get install -y build-essential

# establish the work directory in the container 
WORKDIR /app

# Clone the GitHub repository
RUN apt-get install -y git
RUN git clone https://github.com/Kevs98/token-app.git .

# install dependencies
RUN npm install

# install bcrypt
RUN npm uninstall bcrypt
RUN npm install bcrypt

# cpy the rest of the files in project
COPY . . 

# exporse the port for running the app
EXPOSE 3005

# start app
CMD ["npm", "run", "start"]