import { setPostings, setPostingStatus } from '../actions/postings';
import { PostingsActionType } from '../reducers/postingsReducer';
import { ApplicationStateActions } from '../reducers/applicationStateReducer';

const postings = [
  {
    id: 1,
    title: 'posting 1',
    description: 'posting 1 description',
  },
  {
    id: 2,
    title: 'posting 2',
    description: 'posting 2 description',
  },
];

describe('postings actions', () => {
  it('should return a set postings action with the provided postings', () => {
    expect(setPostings(postings)).toEqual({
      type: PostingsActionType.SET_POSTINGS,
      postings,
    });
  });

  it('should create a setPostingStatus action for the provided posting id and status', () => {
    expect(setPostingStatus('test status', postings[0].id)).toEqual({
      type: ApplicationStateActions.SET_CREATE_POSTING_STATUS,
      postingId: postings[0].id,
      status: 'test status',
    });
  });
});
