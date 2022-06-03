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
    let p = document.createElement('p');
    if(msgObj.username == userName) {
        p.innerHTML = `${userName} says: ` +  msgObj.msg + ' on ' +msgObj.date;
    }
    else {
        p.innerHTML = "xUUU";
    }
    document.body.appendChild(p);
});

socket.on('new user', (username) => {
    let newUserDiv = document.createElement('div');
    newUserDiv.classList.add('joined');
    newUserDiv.innerHTML = `${username} joined conversation.`;
    document.body.appendChild(newUserDiv);
} );





