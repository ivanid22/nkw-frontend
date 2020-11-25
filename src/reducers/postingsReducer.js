export const PostingsActionType = {
  SET_POSTINGS: 'SET_POSTINGS',
  UPDATE_POSTING: 'UPDATE_POSTING',
};

const postingsReducer = (state = [], action) => {
  switch (action.type) {
    case PostingsActionType.SET_POSTINGS:
      return action.postings;
    default:
      return state;
  }
};

export default postingsReducer;
