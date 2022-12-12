import {CMS} from '../Store/TypeConstants';

export const getCMSDetails = payload => ({
  type: CMS.GET_CMS_REQUEST.type,
  payload,
});
