import request from './request';
import local from './local';
import queryString from 'qs';
import _ from 'lodash';
import Local from './local';
import store from '../store';
import Swal from 'sweetalert2';
let helper = {};
helper.replaceAll = (str, search, replacement) => {
    console.log("str, search, replacement", str, search, replacement)
    if (!str) str = '';
    return str.replace(new RegExp(search, 'g'), `"${replacement}"`);
}
helper.reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};
helper.getApiByName = (apis, name) => {
    for (var i = 0; i < apis.length; i++) {
        if (apis[i].name === name) return apis[i];
    }
    return null;
}
helper.showCustomModal = opts => {
    let { type, props } = opts;
    let store = store();
    return new Promise((resolve, reject) => {
        store.dispatch({
            type: 'PUSH_MODAL', data: {
                type,
                props,
                cb: rs => {
                    resolve(rs);
                }
            }
        })
    })

    // alert(content);
}
helper.alert = (title='',content,type="warning") => {
    let store = store();
    Swal.fire(title,content, type); // VietHx add

}
helper.confirm = content => {
    return new Promise((resolve, reject) => {
        Swal.fire({
            title: content,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.value) {
                Swal.fire(
                    'Success!',
                )
                resolve(true);
            }
        })
    })
}
helper.callPageApi = (page, name, data) => {
    let api = helper.getApiByName(page.apis, name);
    let input = _.clone(data), url = api.url;
    switch (api.method) {
        case 'GET':
            for (var i in data) {
                if (data[i] === undefined) delete data[i];
            }
            input = Object.assign({}, {
                page: page.id,
                api: api.name,
            }, data);
            url += `?${queryString.stringify(input)}`
            break;
        case 'PATCH':
        case 'DELETE':
            if (api.type === 'update') {
                url += `/${data.id}?${queryString.stringify({ page: page.id, api: api.name })}`;
                delete input.id;
            }
            break;
        default:
            url += `?${queryString.stringify({ page: page.id, api: api.name })}`;
            break;
    }
    return request.request(`${url}`, input, {}, api.method);
}
helper.getReportUrl = (page, name, data) => {
    let api = helper.getApiByName(page.apis, name);
    let input = _.clone(data), url = api.url;
    switch (api.method) {
        case 'GET':
            for (var i in data) {
                if (data[i] === undefined) delete data[i];
            }
            input = Object.assign({}, {
                page: page.id,
                api: api.name,
                accesstoken: Local.get('session') || 'customer'
            }, data);
            url += `?${queryString.stringify(input)}`
            break;
        default:
            break;
    }
    console.log('report url', url);
    return url;
}
helper.getApiUrl = (page, name) => {
    let api = null;
    for (var i = 0; i < page.apis.length; i++) {
        if (page.apis[i].name === name) {
            api = page.apis[i];
            break;
        }
    }
    switch (api.action) {
        default:
            return `/${api.controller}/${api.action}?page=${page.id}&api=${name}`;
    }
}
helper.getPage = async id => {
    // id = Number(id); Tuyennt
    let meta = local.get('meta');
    let pages = meta.pages;
    for (var i = 0; i < pages.length; i++) {
        if (pages[i].id === id) {
            if (!Array.isArray(pages[i].buttons)) pages[i].buttons = [];
            return pages[i]
        }
    }
}

helper.validateInput = (input, regex) => {
    var re = new RegExp(regex, 'g');
    var result = re.test(input)
    return !!result;
}

helper.success = content => {
    let store = store();  
    Swal.fire({
        title: 'Success!',
        text: content,
        icon: 'success',      
    })
}








export default helper;