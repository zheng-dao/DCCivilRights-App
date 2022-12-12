import {select, call, put} from 'redux-saga/effects';
import {postApi, getApi} from '../../utils/helpers/ApiRequest';
// import {getLogout} from '../../redux/Action/AuthAction';
import showErrorAlert from '../../utils/helpers/Toast';

export function* getToken() {
  const TokenReducer = yield select(state => state.TokenReducer);
  return TokenReducer?.token;
}

export const json_data = {
  Accept: 'application/json',
  contenttype: 'application/json',
};

export const form_data = {
  Accept: 'application/json',
  contenttype: 'multipart/form-data',
};

function* lgout() {
  showErrorAlert('Session expired please log in again.');
  yield put(getLogout());
}

export async function POST(URL, PAYLOAD, TOKEN, HEADER = json_data) {
  try {
    let response = {};
    if (HEADER.contenttype == 'application/json') {
      response = await postApi(URL, {...PAYLOAD, token: TOKEN}, TOKEN, HEADER);
    } else {
      response = await postApi(URL, PAYLOAD, TOKEN, HEADER);
    }

    console.log(response, '-88');
    if (response?.data?.status == 200) {
      return response?.data;
    } else if (response?.data?.status == 401) {
      showErrorAlert('Session expired please log in again.');
      lgout();
    } else {
      throw response?.data;
    }
  } catch (error) {
    throw error;
  }
}

export async function GET(URL, TOKEN, HEADER = json_data) {
  try {
    let response = await getApi(URL, TOKEN, HEADER);
    if (response?.data?.status == 200) {
      return response?.data;
    } else if (response?.data?.status == 401) {
      showErrorAlert('Session expired please log in again.');
      lgout();
    } else {
      throw response?.data;
    }
  } catch (error) {
    throw error;
  }
}

export function* GET_SET(
  _SUCCESS,
  _FAILD,
  URL,
  MULTIPLE = false,
  HEADER = json_data,
  TOKEN,
) {
  try {
    if (!TOKEN) {
      TOKEN = yield call(getToken);
    }
    let response = yield call(getApi, URL, TOKEN, HEADER);
    if (response?.status == 200) {
      if (MULTIPLE) {
        yield put({
          type: _SUCCESS.type,
          value: _SUCCESS.value,
          data: response.data.data,
        });
      } else {
        yield put({
          type: _SUCCESS.type,
          data: {
            [_SUCCESS.value]: response.data,
          },
        });
      }
    } else if (response?.data?.status == 401) {
      showErrorAlert('Session expired please log in again.');
      // yield put(getLogout());
    } else {
      if (MULTIPLE) {
        yield put({
          type: _FAILD.type,
          value: _FAILD.value,
          data: {
            error: response.data,
          },
        });
      } else {
        yield put({
          type: _FAILD.type,
          data: {
            error: response.data,
          },
        });
      }
    }
  } catch (error) {
    if (MULTIPLE) {
      yield put({type: _FAILD.type, value: _FAILD.value, data: {error: error}});
    } else {
      yield put({type: _FAILD.type, data: {error: error}});
    }
  }
}

export function* POST_SET(
  _SUCCESS,
  _FAILD,
  URL,
  PAYLOAD = {},
  MULTIPLE = false,
  HEADER = json_data,
  TOKEN,
) {
  try {
    if (!TOKEN) {
      TOKEN = yield call(getToken);
    }
    let response = {};
    if (HEADER.contenttype == 'application/json') {
      response = yield call(
        postApi,
        URL,
        {...PAYLOAD, token: PAYLOAD?.token != '_' ? TOKEN : ''},
        TOKEN,
        HEADER,
      );
    } else {
      response = yield call(postApi, URL, PAYLOAD, TOKEN, HEADER);
    }
    console.log(response, 'POST RESPONSE');
    if (response?.status == 200) {
      if (MULTIPLE) {
        yield put({
          type: _SUCCESS.type,
          value: _SUCCESS.value,
          data: response.data.data,
        });
      } else {
        yield put({
          type: _SUCCESS.type,
          data: {
            [_SUCCESS.value]: response.data.data,
          },
        });
      }
    } else if (response?.data?.status == 401) {
      showErrorAlert('Session expired please log in again.');
      // yield put(getLogout());
    } else {
      if (MULTIPLE) {
        yield put({
          type: _FAILD.type,
          value: _FAILD.value,
          data: {
            error: response.data,
          },
        });
      } else {
        yield put({
          type: _FAILD.type,
          data: {
            error: response.data,
          },
        });
      }
    }
  } catch (error) {
    if (MULTIPLE) {
      yield put({type: _FAILD.type, value: _FAILD.value, data: {error: error}});
    } else {
      yield put({type: _FAILD.type, data: {error: error}});
    }
  }
}
