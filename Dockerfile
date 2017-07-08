FROM 

# Create app directory
RUN mkdir -p /home/Node_Monitor
WORKDIR /home/Node_Monitor

# Bundle app source
COPY . /home/Node_Monitor
RUN npm install

# START

EXPOSE 2333
CMD ['npm', 'start']