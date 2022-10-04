var express = require('express');
var app = express();
//var app      = require('express')();

//var http     = require('http');
//var server   = http.Server(app);
var http = require('http').Server(app);

//var socketio = require('socket.io');
//var io       = socketio(server);
var io = require('socket.io')(http);

const path = require('path');
var SerialPort = require('serialport').SerialPort;
var ReadlineParser = require('@serialport/parser-readline').ReadlineParser;
var parsers = SerialPort.parsers;
var sp = new SerialPort( {
  path:'COM5',
  baudRate: 9600
});

var parser = sp.pipe(new ReadlineParser({
  delimiter: '\r\n'
}));

var port = 3000;
sp.pipe(parser);
sp.on('open', () => console.log('Port open'));
parser.on('data', function(data){
	console.log(data.toString());
	if(data.substring(0,3) == "led"){
		if(data.substring(3,4) == "0")	ledStatus = "rOn";
		else if (data.substring(3,4) == "1") ledStatus = "rOff";
		else if (data.substring(3,4) == "2") ledStatus = "gOn";
		else if (data.substring(3,4) == "3") ledStatus = "gOff";
		else if (data.substring(3,4) == "4") ledStatus = "bOn";
		else if (data.substring(3,4) == "5") ledStatus = "bOff";
		io.emit('led', ledStatus);
		console.log('led status: ' + ledStatus);
	} else if(data.substring(0,3) == "adc"){
		adcValue = data.substring(3);
		io.emit('adc', adcValue);
		console.log('adc value: ' + adcValue);
	} else if(data.substring(0,3) == "sev"){
		if(data.substring(3,4) == "0") sevStatus = 45;
		else if (data.substring(3,4) == "1") sevStatus = 90;
		else if (data.substring(3,4) == "2") sevStatus = 135;
		io.emit('sev', sevStatus);
		console.log('sev status: ' + sevStatus);
	}
});

 

app.get('/rled_on',function(req,res){
	sp.write('led0\n\r', function(err){
		if (err) return console.log('Error on write: ', err.message);
        console.log('send: Redled on');
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('LED ON\n');
	});
});

app.get('/rled_off',function(req,res){
	sp.write('led1\n\r', function(err){
		if (err) return console.log('Error on write: ', err.message);
        console.log('send: Redled off');
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('LED OFF\n');
	}); 
});

app.get('/gled_on',function(req,res){
	sp.write('led2\n\r', function(err){
		if (err) return console.log('Error on write: ', err.message);
        console.log('send: Greenled on');
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('LED ON\n');
	});
});

app.get('/gled_off',function(req,res){
	sp.write('led3\n\r', function(err){
		if (err) return console.log('Error on write: ', err.message);
        console.log('send: Greenled off');
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('LED OFF\n');
	}); 
});

app.get('/bled_on',function(req,res){
	sp.write('led4\n\r', function(err){
		if (err) return console.log('Error on write: ', err.message);
        console.log('send: Blueled on');
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('LED ON\n');
	});
});

app.get('/bled_off',function(req,res){
	sp.write('led5\n\r', function(err){
		if (err) return console.log('Error on write: ', err.message);
        console.log('send: Blueled off');
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('LED OFF\n');
	}); 
});

app.get('/sev0',function(req,res){
	sp.write('sev0\n\r', function(err){
		if (err) return console.log('Error on write: ', err.message);
    console.log('send: sev0');
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('sev : 45\n');
	}); 
});

app.get('/sev1',function(req,res){
	sp.write('sev1\n\r', function(err){
		if (err) return console.log('Error on write: ', err.message);
        console.log('send: sev1');
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('sev : 90\n');
	}); 
});

app.get('/sev2',function(req,res){
	sp.write('sev2\n\r', function(err){
		if (err) return console.log('Error on write: ', err.message);
        console.log('send: sev2');
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('sev : 135\n');
	}); 
});

app.use(express.static(__dirname + '/public'));
http.listen(port, function() {  // server.listen(port, function() {
    console.log('listening on *:' + port);
});