import postingsReducer, { PostingsActionType } from '../reducers/postingsReducer';

const testPostings = [
  {
    title: 'first title',
    description: 'second description',
    price: 100,
  },
  {
    title: 'second title',
    description: 'second description',
    price: 200,
  },
];

describe('postingsReducer', () => {
  it('should set the state to the provided postings array', () => {
    const action = { type: PostingsActionType.SET_POSTINGS, postings: testPostings };
    expect(postingsReducer(null, action)).toEqual(testPostings);
  });
});
