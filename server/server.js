const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { UsersList } = require('./utils/users-list');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const usersList = new UsersList();

// add express static middleware
app.use(express.static(publicPath));

// listen to client connections
io.on('connection', (socket) => {
  console.log('New user connected');

  // listen to join events emitted by the user
  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }

    socket.join(params.room);
    usersList.removeUser(socket.id);
    usersList.addUser(socket.id, params.name, params.room)

    io.to(params.room).emit('updateUserList', usersList.getUserList(params.room));
    // socket.emit() sends an event only to the one socket that connected
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    // socket.broadcast.to().emit() sends an event to every connected client in the specified room but this socket
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',  `Beware! ${params.name} has joined!`));
    callback();
  });

  // listen to messages created by client
  socket.on('createMessage', (message, callback) => {
    const user = usersList.getUser(socket.id);

    if (user && isRealString(message.text)) {
      //send it to every connected client in the room (io.emit rather than socket.emit)
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }

    
    callback();
  });

  // listen to createLocationMessage events emitted by the user
  socket.on('createLocationMessage', (coords) => {
    const user = usersList.getUser(socket.id);

    if (user) {
      // generate a link with the location in google maps to every connected client in the room
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
    
  });

  // listen to client disconnections
  socket.on('disconnect', () => {
    const user = usersList.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', usersList.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });
});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});