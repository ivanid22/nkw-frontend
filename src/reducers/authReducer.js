export const AuthActionType = {
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
  SIGN_UP: 'SIGN_UP',
  SIGN_IN_FAILED: 'SIGN_IN_FAILED',
  SIGN_UP_FAILED: 'SIGN_UP_FAILED',
};

const initialState = {
  client: '',
  accessToken: '',
  uid: '',
  status: 'idle',
  error: '',
};

const authReducer = (state = initialState, action) => {
  const { client, accessToken, uid } = action;
  switch (action.type) {
    case AuthActionType.SIGN_IN:
      return {
        client,
        accessToken,
        uid,
        status: 'signedIn',
        signedIn: true,
      };
    case AuthActionType.SIGN_OUT:
      return initialState;
    case AuthActionType.SIGN_IN_FAILED:
      return {
        ...initialState,
        status: 'signInFailed',
        error: action.error,
      };
    case AuthActionType.SIGN_UP_FAILED:
      return {
        ...initialState,
        status: 'signUpFailed',
        error: action.error,
      };
    default:
      return state;
  }
};

export default authReducer;
