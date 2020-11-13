import {AUTH_ERROR, LOGIN_SUCCESS, USER_LOADED} from '../actions/types';
import local from '../services/local';

const initialState = {
    accessToken: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                user: payload,
                isAuthenticated: true,
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('accessToken', payload.accessToken);
            return {
                ...state,
                ...payload,
                isAuthenticated: true
            }
        case AUTH_ERROR : 
        localStorage.removeItem('accessToken');
        return {
            ...state,
            accessToken: null,
            isAuthenticated: false
        }
        default:
            return state;
    }
}