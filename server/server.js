const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// add express static middleware
app.use(express.static(publicPath));

// listen to client connections
io.on('connection', (socket) => {
  console.log('New user connected');

  // listen to messages created by client and send it to every connected client
  socket.on('createMessage', (message) => {
    socket.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().toLocaleString()
    });
  })
  

  // listen to client disconnections
  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });
});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});