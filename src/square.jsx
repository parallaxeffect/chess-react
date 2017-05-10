import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import {connect} from 'react-redux';

import {movePiece} from './actions';

@connect(()=>{return {}},(dispatch)=>{
	return {
		movePiece: (fromFile, fromRank, toFile, toRank) => {
			dispatch(movePiece(fromFile, fromRank, toFile, toRank))
		}
	}
})
@DropTarget("piece", {
	drop(props, monitor) {
		const piece = monitor.getItem();
		props.movePiece(piece.file, piece.rank, props.file, props.rank);
	}
}, (connect, monitor)=>{ return {
	connectDropTarget: connect.dropTarget()
}
})
export class Square extends React.Component {
	render () {
		const {rank, file, connectDropTarget} = this.props;
		const isLight = (rank + file) % 2;
		const colorClass = isLight ? "light" : "dark"
		return connectDropTarget(<div className={"square " + colorClass}>{this.props.children}</div>)
	}
}

@DragSource("piece", {
	beginDrag(props) {
		return { rank: props.piece.rank, file: props.piece.file}
	}
}, (connect, monitor)=>{
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}
})
export class Piece extends React.Component {
	render() {
		const {piece, connectDragSource, isDragging} = this.props;
		return connectDragSource(<div className={
			["piece", piece.color, (isDragging?"moving":"")].join(" ")}> {piece.text}</div>)
	}
}