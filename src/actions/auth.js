import axios from 'axios';
import { AuthActionType } from '../reducers/authReducer';

export const signIn = data => ({
  type: AuthActionType.SIGN_IN,
  accessToken: data.accessToken,
  client: data.client,
  uid: data.uid,
});

export const signInFailed = () => ({
  type: AuthActionType.SIGN_IN_FAILED,
  error: 'Incorrect username or password',
});

const processSignInResponse = response => ({
  accessToken: response.headers['access-token'],
  client: response.headers.client,
  uid: response.headers.uid,
});

export const startSignUp = data => dispatch => {
  const apiUrl = process.env.REACT_APP_API_URL;
  axios({
    method: 'post',
    url: `${apiUrl}/auth/sign_in`,
    data: {
      email: data.email,
      password: data.password,
      password_confirmation: data.passwordConfirmation,
    },
  }).then(response => {
    if (response.status === 401) dispatch(signInFailed());
    else dispatch(signIn(processSignInResponse(response)));
  }).catch(error => {
    if (error.response.status === 401) dispatch(signInFailed());
  });
};
