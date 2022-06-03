let socket = io();
let usernameInput = document.getElementById('username');
let startConversationButton = document.getElementById('startbtn');
startConversationButton.addEventListener('click', (e) => {
    let username = usernameInput.value;
    if(username.trim().length) {
        socket.emit('new user', username);
    }
else {e.preventDefault();} 
    
});
