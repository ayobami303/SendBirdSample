import {combineReducers} from 'redux';
import login from './loginReducer';
import menu from './menuReducers';
import profile from './profileReducers';
import openChannel from './openChannelReducers';

export default combineReducers({
	login,
	menu,
	profile,
	openChannel 
});