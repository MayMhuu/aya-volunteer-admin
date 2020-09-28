import Local from './local';
import Config from './config';
import Helper from './helper';
import i18next from 'i18next';
let request = {};
request.upload = async (url, formData) => {
  url = `${Config.host}${url}`
  let option = {
    method: 'PUT', // or 'PUT'
    body: formData,
    headers: {
      'Authorization': `Bearer ${Local.get('session') || 'customer'}`
    }
  };
  if (Config.debug) console.log(`[POST]`, url, option);
  let res = await fetch(url, option);
  let rs = await res.json();
  if (res.status !== 200) {
    console.log(res);
    throw rs;
  }
  if (Config.debug) console.log(`[RESPONSE]`, url, rs);
  return rs;
}
request.request = async (url, data, headers, method = 'POST') => {
  url = `${Config.host}${url}`;
  let option = {
    method, // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': `Bearer ${Local.get('session') || 'customer'}`
    }
  };
  option.headers = Object.assign({}, option.headers, headers);
  if (method === 'GET') delete option.body;

  if (Config.debug) console.log(`[${method}]`, url, option);

  let res = await fetch(url, option);
  try {
    let rs = await res.json();
    if (Config.debug) console.log(`[RESPONSE]`, url, rs);
    rs.err = (rs.err == undefined || rs.err == null || rs.err == '') ? res.status : rs.err;
    switch (res.status) {
      case 401:
        Helper.alert(i18next.t("session_expired_please_login_again"));
        window.location.href = '/#/login';
        break;
      case 500:
        Helper.alert(res.message || i18next.t('internalServerError'));
        throw rs;
        break;
      case 200:
        return rs;
      case 404:
        Helper.alert(res.message || i18next.t('dataNotFound'));
        throw rs;
        break;
      case 400:
        Helper.alert("Bad Request",rs.message || i18next.t('badRequest'), "warning");
        return rs;
        // Helper.alert(rs.message || i18next.t('badRequest'));
        // throw rs;
        break;
      default:
        throw rs;
    }

  } catch (err) {
    console.log('res', res, err);
    throw err;
  }

}
export default request;