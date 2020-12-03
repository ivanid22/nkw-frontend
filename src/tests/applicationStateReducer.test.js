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
});
