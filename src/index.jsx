import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';

import {reducer} from './reducer.js'
import {Board} from './board.jsx';
import {Restart} from './restart.jsx';

const middleware = socket => store => next => action => {
	switch(action.type) {
		case 'RESTART_GAME':
		case 'MOVE_PIECE': 
			socket.emit('action', action);
		break;
	}
	return next(action);
}

const socket = io();

const store = applyMiddleware(middleware(socket))(createStore)(reducer);


socket.on('state', (state) => store.dispatch({type: 'SET_STATE', state}));


class App extends React.Component {
	render () {
		return (<Provider store={store}><div className="app"><Board/><Restart/></div></Provider>);
	}
}

render(<App/>, document.getElementById('app'));


console.log('Hello Chess');
