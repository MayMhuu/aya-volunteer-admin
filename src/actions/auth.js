import { useHistory } from 'react-router-dom';
import { LOGIN_SUCCESS } from './types';
import axios from 'axios';

const login = (username, password) => async dispatch => {
    var formData = new FormData();
    formData.append(username);
    formData.append(password);

    const config = {
        method : "POST",
        url : "https://ayavapp.herokuapp.com/auth/admin",
        headers: {'Content-Type': 'multipart/form-data' }
    }

    axios(config).then(res=> {
      if(  res.status === 200) {
          console.log ('token ' + res.data.accessToken)
      }
    }).catch (err => {
        console.log ('err ' + err.message)
    })

}

module.exports = {login}