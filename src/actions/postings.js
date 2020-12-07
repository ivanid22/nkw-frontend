import { PostingsActionType } from '../reducers/postingsReducer';
import { ApplicationStateActions } from '../reducers/applicationStateReducer';

export const setPostings = postings => ({
  type: PostingsActionType.SET_POSTINGS,
  postings,
});

export const setPostingStatus = (status, postingId) => ({
  type: ApplicationStateActions.SET_CREATE_POSTING_STATUS,
  postingId,
  status,
});
