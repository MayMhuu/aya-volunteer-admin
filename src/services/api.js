import axios from 'axios';
import request from './request';
import objConfig from './config';
import local from './local';
var FormData = require('form-data');
var configs = {}

var path = {
    //login
    login: '/auth/admin',
    resetPass: '/api/user/resetPass',
    createNewPass: '/api/user/createNewPass',
    resetPassVerifyOTP: '/api/user/resetPassVerifyOTP',
    logout: '/api/user/logout',

    //approve
    memberList: '/admin/getUserList',
    memberDetail: '/admin/userDetails',
    approve: '/admin/approveUser',
    reject: '/admin/rejectUser',

};


Object.keys(path).forEach(function (key) {

    configs[key] = async function (data, token) {

        let result = await request.request(path[key], data, token);
        return result;

    }
}, this);




export default configs;