import React from 'react';
import {connect} from 'react-redux';
import {DragDropContext} from 'react-dnd';
import HTML5backend from 'react-dnd-html5-backend';

import {Piece, Square} from './square.jsx'

@DragDropContext(HTML5backend)
@connect((state)=>{return {
	pieces: state.pieces
}})
export class Board extends React.Component {
	piece(file, rank) {
		const {pieces} = this.props;
		const piece = pieces.filter((piece)=>{
				return piece.file == file && piece.rank == rank
			})[0]
		return piece 
	}
	render () {
		const ranks = [0,1,2,3,4,5,6,7];
		const files = [0,1,2,3,4,5,6,7];
		
		return (
			<div className='board'> {ranks.map((rank)=>{
				return (
					<div key={rank}> {files.map((file)=> {
						const piece = this.piece(file, rank);
						return <Square key={file} file={file} rank={rank}> {piece?<Piece piece={piece} />:null} </Square>				
						
					})}
					</div>
				)
			})}
		    </div>
		)
	}
}
