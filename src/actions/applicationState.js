import { ApplicationStateActions } from '../reducers/applicationStateReducer';

export const setUserProfile = userProfile => ({
  type: ApplicationStateActions.SET_USER_PROFILE,
  userProfile,
});

export const clearUserProfile = () => ({
  type: ApplicationStateActions.CLEAR_USER_PROFILE,
});
