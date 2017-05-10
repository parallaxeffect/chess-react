import React from 'react';
import {connect} from 'react-redux';

import {resetBoard} from './actions';

@connect(()=>{return {}}, (dispatch)=>{
	return {
		resetBoard: () => dispatch(resetBoard())
	}
})
export class Restart extends React.Component {
	render() {
		return <button className="restart"  onClick={()=>this.props.resetBoard()}>Reset Board</button>
	}
}