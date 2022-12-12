import {LOCATION} from '../Store/TypeConstants';

export const getLocationDetails = payload => ({
  type: LOCATION.SAVE_LOCATION_DETAILS_REQUEST.type,
  payload,
});

export const getLocationList = () => ({
  type: LOCATION.GET_LOCATION_LIST_REQUEST.type,
});
