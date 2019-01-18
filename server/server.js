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

  // socket.emit sends an event only to the one socket that connected
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app!',
    createdAt: new Date().toLocaleString()
  });

  // socket.broadcast.emit sends an event to every connected client but this socket
  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'Beware! Someone joined the chat!',
    createdAt: new Date().toLocaleString()
  })

  // listen to messages created by client
  socket.on('createMessage', (message) => {
    //send it to every connected client (io.emit rather than socket.emit)
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().toLocaleString()
    });
  });

  // listen to client disconnections
  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });
});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});