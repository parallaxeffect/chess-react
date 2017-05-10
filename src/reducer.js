
const initialState = {pieces:[]}

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		
	case 'SET_STATE':
		return action.state;
		
	default:
		return state;
	}
};