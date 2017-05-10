var bodyParser = require('body-parser');
var fs = require('fs');
const express = require('express');
const app = express();

import {createStore} from 'redux';
import {reducer} from './server/reducer';

const port = process.env.listen;


const store = createStore(reducer);

app.use(bodyParser.json());  

app.use('/', express.static('/vagrant/www'));


const server = app.listen(port, function(){
	console.log("Listening on ", port);
});

const io = require('socket.io')(server);

io.on('connection', function(socket) {
	console.log('user connected');
	socket.emit('state', store.getState());
	socket.on('action', (action) => store.dispatch(action));
});

store.subscribe(
	() => {
		console.log('emitting state')
		io.emit('state', store.getState())
	}
);