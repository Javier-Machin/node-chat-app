const socket = io();

// listen to server successful connection
socket.on('connect', function () {
  console.log('Connected to server');

  // send a message to the server
  // socket.emit('createMessage', {
  //   from: 'User@example.com',
  //   text: 'Message from client to server'
  // });
});

// listen to messages emitted from the server
socket.on('newMessage', function (message) {
  console.log('New Message!', message);

  const li = document.createElement("li");
  li.innerHTML = `${message.from}: ${message.text}`;

  document.getElementById("received-messages").appendChild(li);
});

// listen to server disconnection
socket.on('disconnect', function () {
  console.log('Disconnected from server');
});


// listen to form submit and create a createMessage event using the input value as text

const messageForm = document.getElementById('message-form');

messageForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const text = document.querySelector("input[name='message']").value;

  socket.emit('createMessage', {
    from: 'User',
    text
  }, function (data) {
    console.log(data);
  });
});