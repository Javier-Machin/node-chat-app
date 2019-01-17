const socket = io();

// listen to server successful connection
socket.on('connect', function () {
  console.log('Connected to server');

  // send a message to the server
  socket.emit('createMessage', {
    from: 'User@example.com',
    text: 'Message from client to server'
  });
});

// listen to messages emitted from the server
socket.on('newMessage', function (message) {
  console.log('New Message!', message);
});

// listen to server disconnection
socket.on('disconnect', function () {
  console.log('Disconnected from server');
});
