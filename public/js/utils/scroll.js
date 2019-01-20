function scrollToBottom() {
  // Selectors
  const messages = document.getElementById('received-messages');
  const newMessage = messages.lastElementChild;
  
  // Heights
  const clientHeight = messages.clientHeight;
  const scrollTop = messages.scrollTop;
  const scrollHeight = messages.scrollHeight ;
  const newMessageHeight = newMessage.clientHeight;
  let lastMessageHeight = 0
  if (newMessage.previousElementSibling) {
    lastMessageHeight = newMessage.previousElementSibling.clientHeight;
  }

  // if the user is reading at the bottom of the messages list or near the bottom, scroll to the bottom
  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop = scrollHeight;
  }
};