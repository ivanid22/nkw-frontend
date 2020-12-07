import axios from 'axios';
import { setUpdateUserProfileStatus } from './userProfile';
import {
  setUserProfile,
  clearUserProfile,
} from './applicationState';
import {
  processSignInResponse,
  signIn,
  signingIn,
  signInFailed,
  signingUp,
  signOut,
  signUpFailed,
  clearLocalStorage,
} from './auth';
import {
  setPostingStatus,
  setPostings,
} from './postings';

const API_URL = process.env.REACT_APP_API_URL;

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

export const startFetchPostings = () => (dispatch, getState) => {
  const { client, accessToken, uid } = getState().auth;
  axios({
    method: 'get',
    url: `${API_URL}/v1/postings`,
    headers: {
      client,
      uid,
      'access-token': accessToken,
      Accept: 'application/json',
    },
  }).then(response => {
    if (response.status === '401') {
      dispatch({ type: 'SIGN_IN_FAILED', error: response.data });
    } else {
      dispatch(setPostings(response.data));
    }
  }).catch(error => {
    dispatch({ type: 'SIGN_IN_FAILED', error: error.message });
  });
};

export const startSignIn = data => dispatch => {
  dispatch(signingIn());
  axios({
    method: 'post',
    url: `${API_URL}/auth/sign_in`,
    data: {
      email: data.email,
      password: data.password,
    },
  }).then(response => {
    if (response.status === 401) dispatch(signInFailed());
    else {
      dispatch(signIn(processSignInResponse(response)));
      dispatch(startFetchUserProfile());
      dispatch(startFetchPostings());
    }
  }).catch(error => {
    if (error.response.status === 401) dispatch(signInFailed('Invalid login credentials. Please try again.'));
  });
};

export const startSignUp = data => dispatch => {
  dispatch(signingUp());
  axios({
    method: 'post',
    url: `${API_URL}/auth`,
    data: {
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
    },
  }).then(response => {
    dispatch(signIn(processSignInResponse(response)));
    dispatch(startFetchUserProfile());
    dispatch(startFetchPostings());
  }).catch(error => {
    dispatch(signUpFailed(error.response.data.errors.full_messages.join(', ')));
  });
};

export const startSignOut = () => (dispatch, getState) => {
  const { uid, client, accessToken } = getState().auth;
  axios({
    method: 'delete',
    url: `${API_URL}/auth/sign_out`,
    headers: {
      uid,
      client,
      'access-token': accessToken,
    },
  }).then(() => {
    clearLocalStorage();
    dispatch(signOut());
    dispatch(clearUserProfile());
  }).catch(() => {
    clearLocalStorage();
    dispatch(clearUserProfile());
    dispatch(signOut());
  });
};

export const startCreatePosting = data => (dispatch, getState) => {
  dispatch(setPostingStatus('submitting'));
  const { client, accessToken, uid } = getState().auth;
  axios({
    method: 'post',
    url: `${API_URL}/v1/postings`,
    headers: {
      client,
      uid,
      'access-token': accessToken,
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
    data,
  }).then(response => {
    if (response.status === 401) dispatch({ type: 'SIGN_OUT' });
    else {
      dispatch(setPostingStatus('success', response.data.id));
      dispatch(startFetchPostings());
    }
  }).catch(() => {
    dispatch(setPostingStatus('error'));
  });
};

export const startCreateFavorite = postingId => (dispatch, getState) => {
  const { client, accessToken, uid } = getState().auth;
  axios({
    method: 'post',
    url: `${API_URL}/v1/favorites`,
    headers: {
      client,
      uid,
      'access-token': accessToken,
      Accept: 'application/json',
    },
    data: {
      posting_id: postingId,
    },
  }).then(() => dispatch(startFetchPostings()));
};

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
