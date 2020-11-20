import axios from 'axios';
import { AuthActionType } from '../reducers/authReducer';

const API_URL = process.env.REACT_APP_API_URL;

const signIn = data => ({
  type: AuthActionType.SIGN_IN,
  accessToken: data.accessToken,
  client: data.client,
  uid: data.uid,
});

const signOut = () => ({
  type: AuthActionType.SIGN_OUT,
});

const signInFailed = error => ({
  type: AuthActionType.SIGN_IN_FAILED,
  error,
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
  axios({
    method: 'post',
    url: `${API_URL}/auth/sign_in`,
    data: {
      email: data.email,
      password: data.password,
    },
  }).then(response => {
    if (response.status === 401) dispatch(signInFailed());
    else dispatch(signIn(processSignInResponse(response)));
  }).catch(error => {
    if (error.response.status === 401) dispatch(signInFailed('Invalid login credentials. Please try again.'));
  });
};

export const startSignUp = data => dispatch => {
  axios({
    method: 'post',
    url: `${API_URL}/auth`,
    data: {
      email: data.email,
      password: data.password,
      password_confirmation: data.password_onfirmation,
    },
  }).then(response => {
    dispatch(signIn(processSignInResponse(response)));
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
  }).catch(() => {
    dispatch(signOut());
  });
};
