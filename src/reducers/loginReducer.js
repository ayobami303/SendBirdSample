import { LOGIN_SUCCESS, LOGIN_FAIL} from '../actions/types';

const INITIAL_STATE = {
	error: '',
	user: null
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS :
			return {...state, ...INITIAL_STATE, user: action.payload};
			break;
		case LOGIN_FAIL :
			return {...state, ...INITIAL_STATE, error: action.payload};
			break;
		default :
			return state;
	}
}