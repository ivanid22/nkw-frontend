import applicationStateReducer, { ApplicationStateActions } from '../reducers/applicationStateReducer';

describe('applicationStateReducer', () => {
  it('should store the user profile provided in action.userProfile', () => {
    const userProfile = {
      name: 'test',
      location: 'test',
    };

    const action = {
      type: ApplicationStateActions.SET_USER_PROFILE,
      userProfile,
    };

    expect(applicationStateReducer(null, action)).toEqual({
      userProfile,
    });
  });

  it('should clear the current user profile from state', () => {
    const state = {
      userProfile: {
        email: 'test@test.com',
        password: 'test',
      },
    };

    const action = {
      type: ApplicationStateActions.CLEAR_USER_PROFILE,
    };

    expect(applicationStateReducer(state, action)).toEqual({
      userProfile: {},
    });
  });

  it('should set the user profile update status', () => {
    const action = { type: ApplicationStateActions.SET_UPDATING_USER_PROFILE_STATUS, status: 'test' };
    expect(applicationStateReducer(null, action)).toEqual({
      updateUserProfileStatus: 'test',
    });
  });
});
