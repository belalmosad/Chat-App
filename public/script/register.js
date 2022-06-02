let socket = io();
let username = document.getElementById('username').value;
let startConversationButton = document.getElementById('startbtn');
startConversationButton.addEventListener('click', (e) => {
    socket.emit('new user', username);

});
