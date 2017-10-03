const express = require('express');

const PORT_NUMBER = 3000;

var connections = [],
    users = [];

const app = express();
app.use(express.static('./public'));

// sockets
const server = app.listen(PORT_NUMBER);
io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {

    // Disconnect
    socket.once('disconnect', function() {

        for (var i = 0; i < users.length; i++) {
            user = users[i];
            if (user.id == this.id) {
                users.splice(i, 1);
            }
        };

        connections.splice(connections.indexOf(socket), 1);
        socket.disconnect();
        io.emit('disconnect', users);
    });

    // add users
    socket.on('newUser', function(payload) {
        var newUser = {
            id: this.id,
            name: payload.name
        };

        users.push(newUser);

        io.emit('newUser', users);
    });

  // add messages
    socket.on('newMessage', function(payload) {
        var newMessage = {
            timeStamp: payload.timestamp,
            text: payload.text,
            user: payload.user
        };
        io.emit('newMessage', newMessage);
    });
    connections.push(socket);

});


