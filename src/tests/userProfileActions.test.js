import { setUpdateUserProfileStatus } from '../actions/userProfile';
import { ApplicationStateActions } from '../reducers/applicationStateReducer';

describe('user profile actions', () => {
  it('should set user profile status', () => {
    expect(setUpdateUserProfileStatus('test')).toEqual({
      type: ApplicationStateActions.SET_UPDATING_USER_PROFILE_STATUS,
      status: 'test',
    });
  });
});
