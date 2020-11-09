import { combineReducers } from 'redux';
import userInfo from './user';
import modals from './modals';
import auth from './auth';


export default combineReducers({
    userInfo, modals, auth
});