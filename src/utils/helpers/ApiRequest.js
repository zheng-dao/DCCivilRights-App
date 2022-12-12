import axios from 'axios';
import constants from './constants';

export async function getApi(
  url,
  accesstoken,
  header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  },
) {
  console.log(`${constants.BASE_URL}/${url}`);
  return await axios.get(`${constants.BASE_URL}/${url}`, {
    headers: {
      Accept: header.Accept,
      'Content-Type': header.contenttype,
      // 'x-access-token': `${header.authorization}`,
      'x-access-token': `${accesstoken ? accesstoken : ''}`,
    },
  });
}

export async function getApiWithParam(
  url,
  param,
  accesstoken,
  header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  },
) {

  return await axios({
    method: 'GET',
    baseURL: constants.BASE_URL,
    url: url,
    params: param,
    headers: {
      Accept: header.Accept,
      'Content-type': header.contenttype,
    },
  });
}

export async function postApi(
  url,
  payload,
  accesstoken,
  header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  },
) {
console.log(`${constants.BASE_URL}/${url}`);
  return await axios.post(`${constants.BASE_URL}/${url}`, payload, {
    headers: {
      Accept: header.Accept,
      'Content-Type': header.contenttype,
      // 'x-access-token': `${header.authorxization}`,
      'x-access-token': `${accesstoken ? accesstoken : ''}`,
    },
  });
}

export async function deleteApi(
  url,
  accesstoken,
  header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  },
) {
  // console.log("DeleteApi: ", `${constants.BASE_URL}/${url}`)

  return await axios.delete(`${constants.BASE_URL}/${url}`, {
    headers: {
      Accept: header.Accept,
      'Content-Type': header.contenttype,
      'x-access-token': `${accesstoken ? accesstoken : ''}`,
      //  'Authorization': 'Bearer' + ' ' + header.accesstoken,
    },
  });
}
