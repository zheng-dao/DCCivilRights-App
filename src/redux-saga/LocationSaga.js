import {takeLatest, call, put} from 'redux-saga/effects';
import {LOCATION} from '../redux/Store/TypeConstants';
import {POST_SET, GET, GET_SET, POST, getToken} from './setup/method';

function* locationList() {
  try {
    yield call(
      GET_SET,
      LOCATION.GET_LOCATION_LIST_SUCCESS,
      LOCATION.GET_LOCATION_LIST_FAILURE,
      'tour-list',
    );
  } catch (error) {
    yield put({
      type: LOCATION.GET_LOCATION_LIST_FAILURE,
      data: {error: error},
    });
  }
}

function* saveLocation(action) {
  try {
    yield put({
      type: LOCATION.SAVE_LOCATION_DETAILS_SUCCESS.type,
      data: {
        [LOCATION.SAVE_LOCATION_DETAILS_SUCCESS.value]: action.payload,
      },
    });
  } catch (error) {
    yield put({
      type: LOCATION.SAVE_LOCATION_DETAILS_FAILURE.type,
      data: {error: error},
    });
  }
}

export default {
  source: [
    (function* () {
      yield takeLatest(LOCATION.GET_LOCATION_LIST_REQUEST.type, locationList);
    })(),

    (function* () {
      yield takeLatest(
        LOCATION.SAVE_LOCATION_DETAILS_REQUEST.type,
        saveLocation,
      );
    })(),
  ],
};
