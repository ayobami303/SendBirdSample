import { OPEN_CHANNEL_LIST_SUCCESS, OPEN_CHANNEL_LIST_FAIL } from '../actions/types'

const INITIAL_STATE = {
	list: []
}

export default (state = INITIAL_STATE, action ) => {
	switch (action.type) {
		case OPEN_CHANNEL_LIST_SUCCESS :
			return {...state, list:action.list };
			break;
		case OPEN_CHANNEL_LIST_FAIL :
			return state;
			break;		
		default :
			return state;
	}
}