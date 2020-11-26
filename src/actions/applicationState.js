import axios from 'axios';
import { ApplicationStateActions } from '../reducers/applicationStateReducer';

export const setUserProfile = userProfile => ({
  type: ApplicationStateActions.SET_USER_PROFILE,
  userProfile,
});

export const clearUserProfile = () => ({
  type: ApplicationStateActions.CLEAR_USER_PROFILE,
});

export const startFetchUserProfile = () => (dispatch, getState) => {
  const { uid, client, accessToken } = getState().auth;
  const apiUrl = process.env.REACT_APP_API_URL;
  axios({
    method: 'get',
    url: `${apiUrl}/v1/user_profiles/current`,
    headers: {
      uid,
      client,
      'access-token': accessToken,
      Accept: 'application/json',
    },
  }).then(response => {
    if (response.status === 200) dispatch(setUserProfile(response.data));
  });
};
