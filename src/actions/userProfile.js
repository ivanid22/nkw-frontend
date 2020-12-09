import { ApplicationStateActions } from '../reducers/applicationStateReducer';

export const setUpdateUserProfileStatus = status => ({
  type: ApplicationStateActions.SET_UPDATING_USER_PROFILE_STATUS,
  status,
});

export default setUpdateUserProfileStatus;
