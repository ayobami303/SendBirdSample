import { GET_PROFILE_SUCCESS, INIT_PROFILE, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL } from '../actions/types'

const INITIAL_STATE = {
	isSaved: false,
	error: '',
	userInfo: null
}

export default (state = INITIAL_STATE, action ) => {
	switch (action.type) {
		case GET_PROFILE_SUCCESS :
			return {...state, userInfo:action.userInfo };
			break;
		case UPDATE_PROFILE_SUCCESS :
			return {...state, error:'', isSaved:true };
			break;
		case UPDATE_PROFILE_FAIL :
			return {...state, error:action.error, isSaved:false };
			break;
		case INIT_PROFILE :
			return {...state, ...INITIAL_STATE };
			break;
		default :
			return state;
	}
}