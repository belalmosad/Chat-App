let socket = io();

let messageBox = document.getElementById('msg');
let messageBody = document.getElementById('msginpt');
let userName = location.href.split('?username=')[1];

messageBox.addEventListener('click', (e) => {
    e.preventDefault();
    let msgObj = {'username':userName, 'msg': messageBody.value, 'date': new Date()}
    if(messageBody.value) {
        socket.emit('new message', msgObj);
        messageBody.value = '';
    }
});

socket.on('new message', (msgObj) => {
    
    if(msgObj.username == userName) {
        appendSenderDiv(msgObj);
    } else {
        appendRecieverDiv(msgObj);
    }
});

socket.on('new user', (username) => {
    let newUserDiv = document.createElement('div');
    newUserDiv.classList.add('joined');
    newUserDiv.innerHTML = `${username} joined conversation.`;
    document.body.appendChild(newUserDiv);
} );


function appendSenderDiv(msgObj) {
    let messageDiv = document.createElement('div');
    let senderDiv = document.createElement('div');
    let contentDiv = document.createElement('div');
    let dateDiv = document.createElement('div');

    messageDiv.appendChild(senderDiv);
    messageDiv.appendChild(contentDiv);
    messageDiv.appendChild(dateDiv);

    messageDiv.classList.add('sender-msg');
    senderDiv.classList.add('sender-name');
    contentDiv.classList.add('msg-content');
    dateDiv.classList.add('msg-date');

    senderDiv.innerHTML = msgObj.username;
    contentDiv.innerHTML = msgObj.msg;
    dateDiv.innerHTML = msgObj.date;

    document.body.appendChild(messageDiv);
}

function appendRecieverDiv(msgObj) {
    let messageDiv = document.createElement('div');
    let senderDiv = document.createElement('div');
    let contentDiv = document.createElement('div');
    let dateDiv = document.createElement('div');

    messageDiv.appendChild(senderDiv);
    messageDiv.appendChild(contentDiv);
    messageDiv.appendChild(dateDiv);

    messageDiv.classList.add('receiver-msg');
    senderDiv.classList.add('sender-name');
    contentDiv.classList.add('msg-content');
    dateDiv.classList.add('msg-date');

    senderDiv.innerHTML = msgObj.username;
    contentDiv.innerHTML = msgObj.msg;
    dateDiv.innerHTML = msgObj.date;

    document.body.appendChild(messageDiv);
}

