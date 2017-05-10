
const pieceNames = {
	p: "Pawn",
	r: "Rook",
	n: "Knight",
	b: "Bishop",
	k: "King",
	q: "Queen"
}

const pieceGlyph = {
	p: "♟",
	r: "♜",
	n: "♞",
	b: "♝",
	k: "♚",
	q: "♛"
}

const makePiece = (file, rank, letter) => {
	const piece = {file, rank};
	const lower = letter.toLowerCase();
	piece.color = (letter == lower) ? "black" : "white";
	piece.name = pieceNames[lower];
	piece.text = pieceGlyph[lower];
	return piece
}

const stateFromFEN = (fen) => {
	var state = {pieces:[]}
	var square = 0;
	fen.split('').forEach((letter)=>{
		if (square>63) {return;}
		
		if ("prnbkqPRNBKQ".includes(letter)) {
			const file = square % 8;
			const rank = parseInt(square / 8);
			const piece = makePiece(file, rank, letter);
			state.pieces.push(piece);
			square = square + 1;
		}
		else if ("12345678".includes(letter)) {
			square = square + parseInt(letter);
		}
		
	});
	return state;
}

const initialState = stateFromFEN('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')

const deletePiece = (state, action) => {
	if (action.toFile == action.fromFile && action.toRank == action.fromRank) {
		return state;
	}
	const newState = {...state,
		pieces: state.pieces.filter((piece)=>{
			return !(piece.file == action.toFile && piece.rank == action.toRank)
		})}
	return newState;
}

const movePiece = (state, action) => {
	const newState = {...state, 
			pieces: state.pieces.map((piece)=>{
				return (piece.file == action.fromFile && piece.rank == action.fromRank) ? {...piece, rank: action.toRank, file: action.toFile} : piece
			})} 
		return newState;	
}

export function reducer (state = initialState, action) {
	switch (action.type) {
	case 'RESTART_GAME':
		return initialState;
	case 'MOVE_PIECE':	
		return movePiece(deletePiece(state, action), action);
	
	default:
		return state;
	}
}