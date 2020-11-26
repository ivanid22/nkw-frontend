import axios from 'axios';
import { AuthActionType } from '../reducers/authReducer';
import { clearUserProfile, startFetchUserProfile } from './applicationState';
import { startFetchPostings } from './postings';

const API_URL = process.env.REACT_APP_API_URL;

export const signIn = data => ({
  type: AuthActionType.SIGN_IN,
  accessToken: data.accessToken,
  client: data.client,
  uid: data.uid,
});

const signingIn = () => ({
  type: AuthActionType.SIGNING_IN,
});

export const signOut = () => ({
  type: AuthActionType.SIGN_OUT,
});

export const signInFailed = error => ({
  type: AuthActionType.SIGN_IN_FAILED,
  error,
});

const signingUp = () => ({
  type: AuthActionType.SIGNING_UP,
});

const signUpFailed = error => ({
  type: AuthActionType.SIGN_UP_FAILED,
  error,
});

const processSignInResponse = response => ({
  accessToken: response.headers['access-token'],
  client: response.headers.client,
  uid: response.headers.uid,
});

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
    dispatch(startFetchPostings());
  }).catch(error => {
    dispatch(signUpFailed(error.response.data.errors.full_messages.join(', ')));
  });
};

export const startSignOut = data => dispatch => {
  const { uid, client, accessToken } = data;
  axios({
    method: 'delete',
    url: `${API_URL}/auth/sign_out`,
    headers: {
      uid,
      client,
      'access-token': accessToken,
    },
  }).then(() => {
    dispatch(signOut());
    dispatch(clearUserProfile());
  }).catch(() => {
    dispatch(clearUserProfile());
    dispatch(signOut());
  });
};
