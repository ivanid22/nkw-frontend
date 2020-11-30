export const ApplicationStateActions = {
  SET_USER_PROFILE: 'SET_USER_PROFILE',
  SET_ACTIVE_NAVIGATION_SLIDE: 'SET_ACTIVE_NAVIGATION_SLIDE',
  CLEAR_USER_PROFILE: 'CLEAR_USER_PROFILE',
  SET_CREATE_POSTING_STATUS: 'SET_CREATE_POSTING_STATUS',
};

const initialState = {
  userProfile: {},
  activeNavigationSlide: null,
  createPostingStatus: 'idle',
  createdPostingId: null,
};

const applicationStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case ApplicationStateActions.SET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.userProfile,
      };
    case ApplicationStateActions.CLEAR_USER_PROFILE:
      return {
        ...state,
        userProfile: initialState.userProfile,
      };
    case ApplicationStateActions.SET_ACTIVE_NAVIGATION_SLIDE:
      return {
        ...state,
        activeNavigationSlide: action.slide,
      };
    case ApplicationStateActions.SET_CREATE_POSTING_STATUS:
      return {
        ...state,
        createPostingStatus: action.status,
        createdPostingId: action.postingId ? action.postingId : state.createdPostingId,
      };
    default:
      return state;
  }
};

export default applicationStateReducer;
