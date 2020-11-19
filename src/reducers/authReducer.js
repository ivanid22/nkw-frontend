export const AuthActionType = {
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
  SIGN_UP: 'SIGN_UP',
};

const initialState = {
  client: '',
  accessToken: '',
  uid: '',
  signedIn: false,
};

const authReducer = (state = initialState, action) => {
  const { client, accessToken, uid } = action;
  switch (action.type) {
    case AuthActionType.SIGN_IN:
      return {
        client,
        accessToken,
        uid,
        signedIn: true,
      };
    case AuthActionType.SIGN_OUT:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
