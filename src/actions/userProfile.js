import axios from 'axios';
import { ApplicationStateActions } from '../reducers/applicationStateReducer';
import { startFetchUserProfile } from './applicationState';

const setUpdateUserProfileStatus = status => ({
  type: ApplicationStateActions.SET_UPDATING_USER_PROFILE_STATUS,
  status,
});

export const startUpdateUserProfile = data => (dispatch, getState) => {
  const { uid, accessToken, client } = getState().auth;
  const profileId = getState().applicationState.userProfile.id;
  dispatch(setUpdateUserProfileStatus('updating'));
  axios({
    url: `${process.env.REACT_APP_API_URL}/v1/user_profiles/${profileId}`,
    method: 'patch',
    headers: {
      client,
      uid,
      'access-token': accessToken,
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
    data,
  }).then(() => {
    dispatch(setUpdateUserProfileStatus('success'));
    dispatch(startFetchUserProfile());
  }).catch(() => {
    dispatch(setUpdateUserProfileStatus('error'));
  });
};

export default startUpdateUserProfile;
