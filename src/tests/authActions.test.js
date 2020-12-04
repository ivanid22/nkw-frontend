import { signOut, signIn, signInFailed, signUpFailed } from '../actions/auth';
import { AuthActionType } from '../reducers/authReducer';

describe('auth actions', () => {
  it('should return a sign in action with the provided data', () => {
    const authData = {
      accessToken: 'testToken',
      client: 'testClient',
      uid: 'testUid',
    };
    expect(signIn(authData)).toEqual({
      type: AuthActionType.SIGN_IN,
      ...authData,
    });
  });

  it('should return a sign out action', () => {
    expect(signOut()).toEqual({
      type: AuthActionType.SIGN_OUT,
    });
  });

  it('should return a sign in failed action with the provided error', () => {
    expect(signInFailed('test error')).toEqual({
      type: AuthActionType.SIGN_IN_FAILED,
      error: 'test error',
    });
  });

  it('should return a sign up failed action with the provided error', () => {
    expect(signUpFailed('test error')).toEqual({
      type: AuthActionType.SIGN_UP_FAILED,
      error: 'test error',
    });
  });

});
