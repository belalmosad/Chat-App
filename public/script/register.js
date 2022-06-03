let socket = io();
let usernameInput = document.getElementById('username');
let startConversationButton = document.getElementById('startbtn');
startConversationButton.addEventListener('click', (e) => {
    let username = usernameInput.value;
    socket.emit('new user', username);
});
