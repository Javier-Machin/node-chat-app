const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
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
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  // socket.broadcast.emit sends an event to every connected client but this socket
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'Beware! Someone joined the chat!'));

  // listen to messages created by client
  socket.on('createMessage', (message, callback) => {
    //send it to every connected client (io.emit rather than socket.emit)
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  // listen to createLocationMessage events emitted by the user
  socket.on('createLocationMessage', (coords) => {
    // generate a link with the location in google maps to every connected client
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  // listen to client disconnections
  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });
});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});