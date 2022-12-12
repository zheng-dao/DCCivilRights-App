import {CONTRIBUTE} from '../Store/TypeConstants';

export const createContribution = payload => ({
  type: CONTRIBUTE.CREATE_CONTRIBUTION_REQUEST.type,
  payload,
});
