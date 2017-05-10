export const MOVE_PIECE = 'MOVE_PIECE'

export function movePiece(fromFile, fromRank, toFile, toRank) {
	return {
		type: MOVE_PIECE,
		fromFile, fromRank, toFile, toRank
	} 
}

export function resetBoard() {
	return {
		type: 'RESTART_GAME'
	}
}