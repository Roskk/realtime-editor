var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

var users = [];
var connections = [];

server.listen(process.env.PORT || 3000);
console.log('Server Running...');

app.use(express.static(__dirname + '/public'));

// update sockets
io.on('connection', function(socket){	
    socket.on('textbox',function(data){
        socket.broadcast.emit('updateTextbox', data);
    });
});
// Users connect
io.sockets.on('connection', function(socket){
	connections.push(socket);
	console.log('Connected: %s sockets connected', connections.length);

	socket.on('disconnect', function(data){
		users.splice(users.indexOf(socket.username), 1);
		updateUsernames();
		connections.splice(connections.indexOf(socket), 1);
		console.log('Disconnected: %s sockets connected', connections.length);
	});	
	// New Users
	socket.on('new user', function(data, callback){
		callback(true);
		socket.username = data;
		users.push(socket.username);
		updateUsernames();
	});

	function updateUsernames(){
		io.sockets.emit('get users', users);
	}

});






// var express = require('express'),
//     app = express(),
//     server = require('http').createServer(app),
//     io = require('socket.io').listen(server);

// app.use(express.static(__dirname + '/public'));

// io.sockets.on('connection', function(socket){
	
//     socket.on('para',function(data){
//         socket.broadcast.emit('updated_para', data);
//     });
// });

// server.listen(process.env.PORT || 3000);
// console.log('Server Running...');