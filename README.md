## Node-Monitor

A Node.js Monitor Application, based on Node.js, React.js, D3.js. 

It's a Rewrite Version, from [Memeye](https://github.com/JerryC8080/Memeye/) by [JerryC](https://github.com/JerryC8080)

## RUN 

- ` git clone https://github.com/Joursion/Node-Monitor.git `
- ` npm install `
- ` npm start `
- open ` localhost:2333 ` with explore.

## RUN WITH DOCKER

### CLONE 
` git clone https://github.com/Joursion/Node-Monitor.git `

### BUILD
` npm docker ` OR ` docker build -t [imageName] . `

### SHOW IMAGES INFO
` docker images ` to find your docker images info , such as TAG, IMAGE ID ...

### RUN 
` docker run -d -p 2333:[port] [IMAGE ID] `

### SHOW CONTAINER INFO
` docker ps | grep [imageName] `, you will get CONTAINER ID, COMMAND ...

### SHOW LOGS
` docker logs [CONTAINER ID] `

### INTO CONTAINER
` docker exec -i -t [CONTAINER ID] /bin/bash `