// -----------------------------------------------> Require <--------------------------------------
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const {Server} = require('socket.io');
const ms = require('ms');
//const socket = require('./node_modules/socket.io/')

// -----------------------------------------------> Servers <--------------------------------------
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 7000;

// -----------------------------------------------> Middleware <--------------------------------------
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname)));


// -----------------------------------------------> Code <---------------------------------------------

app.get('/', (req, res) => {
    res.render('main.ejs');
});
app.get('/chat', (req, res) => {
    let username = req.query.username;
    res.render('chat.ejs', {username})
});
app.post('/chat', (req, res) => {
    let uriEncoded = encodeURIComponent(req.body.username);
    res.redirect('/chat?username='+uriEncoded);
});





io.on('connection', (socket) => {
    socket.on('new message', (msgObj) => {
        io.emit('new message', msgObj);
    });
    socket.on('new user', (username) => {
        io.emit('new user', username);
    });
})
server.listen(port, () => {console.log(`http://localhost:${port}/`)});