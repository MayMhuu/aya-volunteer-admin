import { useHistory } from 'react-router-dom';
import { LOGIN_SUCCESS, AUTH_ERROR, USER_LOADED, LOAD_USER } from './types';
import axios from 'axios';

//Load User
export const loadUser = () => async dispatch => {
    console.log('user gonna loaded');
    const accessToken = localStorage.accessToken;

    if (accessToken) {
        console.log('token exists')
        axios.defaults.headers.common['Authorization'] = accessToken;
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }

    try {
        const res = await axios.get('/api/auth');
        console.log(`user gonna load ${res.name}`)
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        console.log(`auth err before user loads`);
        dispatch({
            type: AUTH_ERROR,
        });
    }
}

export const login = (username, password) => async dispatch => {
    var formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }

    try {
        axios.post('https://ayavapp.herokuapp.com/auth/admin', formData, config).then(
            res => {
                console.log('res keys ' + Object.keys(res.data))
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data
                });
            }
        ).catch(function (err) {
            console.log(`error message ${err.message}`)
        })
    } catch (err) {
        console.log(`error message ${err.message}`)
    }

}
