import authReducer, { AuthActionType } from '../reducers/authReducer';

const signInData = {
  client: 'testclient',
  accessToken: 'testtoken',
  uid: 'user@email.com',
};

describe('authReducer', () => {
  it('should update auth state with the provided data', () => {
    const { client, accessToken, uid } = signInData;
    const action = {
      type: AuthActionType.SIGN_IN,
      client,
      accessToken,
      uid,
    };
    expect(authReducer(null, action)).toEqual({
      ...signInData,
      status: 'signedIn',
    });
  });

  it('should return initial state when signing out', () => {
    const action = { type: AuthActionType.SIGN_OUT };
    expect(authReducer(null, action)).toEqual({
      client: '',
      accessToken: '',
      uid: '',
      status: 'idle',
      error: '',
    });
  });

  it('should return initial state with error fields when sign in fails', () => {
    const action = {
      type: AuthActionType.SIGN_IN_FAILED,
      error: 'test error',
    };
    expect(authReducer(null, action)).toEqual({
      client: '',
      accessToken: '',
      uid: '',
      status: 'signInFailed',
      error: 'test error',
    });
  });

  it('should return initial state with error fields when account creation fails', () => {
    const action = {
      type: AuthActionType.SIGN_UP_FAILED,
      error: 'test error',
    };
    expect(authReducer(null, action)).toEqual({
      client: '',
      accessToken: '',
      uid: '',
      status: 'signUpFailed',
      error: 'test error',
    });
  });

  it('should set signingIn submission status', () => {
    const action = {
      type: AuthActionType.SIGNING_IN,
    };
    expect(authReducer(null, action)).toEqual({
      status: 'signingIn',
      error: '',
    });
  });

  it('should set account creation submission status', () => {
    const action = {
      type: AuthActionType.SIGNING_UP,
    };
    expect(authReducer(null, action)).toEqual({
      status: 'signingUp',
      error: '',
    });
  });
});
