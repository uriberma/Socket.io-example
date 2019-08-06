const path = require('path');
const express = require('express');
const app = express();
const SocketIO = require('socket.io');

// application settings 
app.set('port', process.env.PORT || 3000);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// start server
const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});

// socketio settigns 
const io = SocketIO(server);

// websockets
io.on('connection', (socket) => {
    console.log('user connected', socket.id);
    socket.on('chat:message', (data) => {
        console.log(data);
        io.sockets.emit('chat:message', data);
    });

    socket.on('chat:typing', (user) => {
        socket.broadcast.emit('chat:typing', user);
    })
});