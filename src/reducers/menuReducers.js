import { DISCONNECT_SUCCESS, INIT_MENU } from '../actions/types'

const INITIAL_STATE = {
	isDisconnected: false
}

export default (state = INITIAL_STATE, action ) => {
	switch (action.type) {
		case DISCONNECT_SUCCESS :
			return {...state, isDisconnected: true };
			break;
		case INIT_MENU :
			return {...state, ...INITIAL_STATE };
			break;
		default :
			return state;
	}
}