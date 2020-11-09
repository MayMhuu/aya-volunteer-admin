import {LOGIN_SUCCESS} from '../actions/types';
import local from '../services/local';

const initialState = {
    accessToken: localStorage.getItem('token'),
    isAuthenticated: null,
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('accessToken', payload.accessToken);
            return {
                ...state,
                ...payload,
                isAuthenticated: true
            }
        default:
            return state;
    }
}