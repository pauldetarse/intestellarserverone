var static = require('node-static');
var http = require('http');
// Create a node-static server instance
var file = new(static.Server)();
/*
app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', "http://"+req.headers.host+':8000');

        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        next();
    }
);


var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server);
	*/


var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

// We use the http module’s createServer function and
// rely on our instance of node-static to serve the files
var server = http.createServer(function (req, res) {
	
  file.serve(req, res);
})




// Use socket.io JavaScript library for real-time web applications
var io = require('socket.io')(server);

 io.set('transports', ['websocket', 'xhr-polling', 'jsonp-polling', 'htmlfile', 'flashsocket']);
    io.set('origins', '*:*');
server.listen(port,ipaddress);

// Let's start managing connections...
io.sockets.on('connection', function (socket){

        // Handle 'message' messages
    socket.on('message', function (message) {
        log('S --> got message: ', message);
        // channel-only broadcast...
        socket.broadcast.to(message.channel).emit('message', message);
    });

    // Handle 'create or join' messages
    socket.on('create or join', function (room) {
		var numClients;
		console.log('create');
		console.log(room);
		roomObject=io.nsps['/'].adapter.rooms[room];
		if(roomObject)
	  		numClients=	Object.keys(roomObject).length;
			numClients=0;
      //  var numClients = io.sockets.clients(room).length;

        log('S --> Room ' + room + ' has ' + numClients + ' client(s)');
        log('S --> Request to create or join room', room);

        // First client joining...
        if (numClients == 0){
            socket.join(room);
            socket.emit('created', room);
        } else if (numClients == 1) {
        // Second client joining...
            io.sockets.in(room).emit('join', room);
            socket.join(room);
            socket.emit('joined', room);
        } else { // max two clients
            socket.emit('full', room);
        }
    });

    function log(){
        var array = [">>> "];
        for (var i = 0; i < arguments.length; i++) {
                array.push(arguments[i]);
        }
        socket.emit('log', array);
    }
});