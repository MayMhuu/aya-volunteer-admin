import axios from 'axios';
import request from './request';
import objConfig  from './config';
import local  from './local';
var FormData = require('form-data');
var configs = {}

var path = {
    //login
    login: '/api/user/login',
    resetPass: '/api/user/resetPass',
    createNewPass: '/api/user/createNewPass',
    resetPassVerifyOTP: '/api/user/resetPassVerifyOTP',
    logout: '/api/user/logout',

    //approve
    approve: '/api/volunteer/approve',
    reject: '/api/volunteer/reject',

};


Object.keys(path).forEach(function (key) {

    configs[key] = async function (data, token) {
        if(data && data.isUpload){
            let formData = new FormData()
            let blob = await fetch(data.file).then(r => r.blob());
            formData.append('file', blob);
            let cong = {
              headers: {
                'Authorization': `Bearer ${local.get('session')}`,
                'content-type': 'multipart/form-data'
              }
            }
            let URI = objConfig.host+'/api/upload/uploadImage';
            try{
                let result = await axios.post(URI, formData, cong);
                return result;
            }catch(err){
                return {err: 400, message: err.message};
            }

        }else{
            let result = await request.request(path[key], data, token);
            return result;
        }

        
    }
}, this);




export default configs;