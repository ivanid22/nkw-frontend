export const ApplicationStateActions = {
  SET_USER_PROFILE: 'SET_USER_PROFILE',
  SET_ACTIVE_NAVIGATION_SLIDE: 'SET_ACTIVE_NAVIGATION_SLIDE',
};

const initialState = {
  userProfile: {},
  activeNavigationSlide: null,
};

const applicationStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case ApplicationStateActions.SET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.userProfile,
      };
    case ApplicationStateActions.SET_ACTIVE_NAVIGATION_SLIDE:
      return {
        ...state,
        activeNavigationSlide: action.slide,
      };
    default:
      return state;
  }
};

export default applicationStateReducer;
