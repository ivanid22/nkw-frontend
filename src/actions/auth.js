import { AuthActionType } from '../reducers/authReducer';

export const signIn = data => ({
  type: AuthActionType.SIGN_IN,
  accessToken: data.accessToken,
  client: data.client,
  uid: data.uid,
});

export const signingIn = () => ({
  type: AuthActionType.SIGNING_IN,
});

export const signOut = () => ({
  type: AuthActionType.SIGN_OUT,
});

export const signInFailed = error => ({
  type: AuthActionType.SIGN_IN_FAILED,
  error,
});

export const signingUp = () => ({
  type: AuthActionType.SIGNING_UP,
});

export const signUpFailed = error => ({
  type: AuthActionType.SIGN_UP_FAILED,
  error,
});

export const clearLocalStorage = () => {
  localStorage.removeItem('client');
  localStorage.removeItem('access-token');
  localStorage.removeItem('uid');
};

export const processSignInResponse = response => ({
  accessToken: response.headers['access-token'],
  client: response.headers.client,
  uid: response.headers.uid,
});
