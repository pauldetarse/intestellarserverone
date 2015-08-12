var static = require('node-static');
var http = require('http');
var express=require('express');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var routes = require('./routes/index');
//var users = require('./routes/users');

var orders = require('./routes/orders');
var youtube = require('./routes/youtube');




var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var app=express();
var server=http.createServer(app);





var io = require('socket.io')(server);

io.set('origins', '*:*');




//database.close();


app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'polymerstellar')));
app.use(express.static(path.join(__dirname, 'polymer')));
app.use(express.static(path.join(__dirname,'webrtc')));






app.use('/', routes);
//app.use('/users', users);
app.use('/api',orders);
app.use('/api',youtube);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

server.listen(port,ipaddress);


// Let's start managing connections...
io.sockets.on('connection', function (socket){

        // Handle 'message' messages
	
    socket.on('message', function (message) {
		console.log('message');
		console.log(message);
        log('S --> got message: ', message);
		console.log('message.channel'+message.channel);
        // channel-only broadcast...
        socket.broadcast.to(message.channel).emit('message', message.message);
    });

    // Handle 'create or join' messages
    socket.on('create or join', function (room) {
		var numClients;
		console.log('create');
		console.log(room);
		roomObject=io.nsps['/'].adapter.rooms[room];
		if(roomObject)
	  		numClients=	Object.keys(roomObject).length;
		else
			numClients=0;
		console.log('numClients '+numClients);
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