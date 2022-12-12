import {takeLatest, call, put} from 'redux-saga/effects';
import {CMS} from '../redux/Store/TypeConstants';
import {POST_SET, GET, GET_SET, POST, getToken} from './setup/method';

function* getCMSDetails(action) {
  try {
    yield call(
      GET_SET,
      CMS.GET_CMS_SUCCESS,
      CMS.GET_CMS_FAILURE,
      `pages/${action.payload}`,
    );
  } catch (error) {
    yield put({
      type: CMS.GET_CMS_FAILURE,
      data: {error: error},
    });
  }
}

export default {
  source: [
    (function* () {
      yield takeLatest(CMS.GET_CMS_REQUEST.type, getCMSDetails);
    })(),
  ],
};
