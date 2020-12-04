import { setUserProfile, clearUserProfile } from '../actions/applicationState';
import { ApplicationStateActions } from '../reducers/applicationStateReducer';

describe('application state actions', () => {
  it('should generate a set user profile action with the provided userProfile', () => {
    const userProfile = {
      name: 'test name',
      location: 'test location',
    };
    expect(setUserProfile(userProfile)).toEqual({
      type: ApplicationStateActions.SET_USER_PROFILE,
      userProfile,
    });
  });

  it('should generate a clear user profile action', () => {
    expect(clearUserProfile()).toEqual({
      type: ApplicationStateActions.CLEAR_USER_PROFILE,
    });
  });
});
