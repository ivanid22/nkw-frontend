import { postingsByUser, postingsFavoritedByUser, postingById } from '../filters/postings';

const user = {
  id: 1,
  name: 'Test user',
};

const postings = [
  {
    title: 'posting 1',
    id: 1,
    favorites: [
      {
        user_profile_id: 1,
      },
    ],
    user_profile_id: 1,
  },
  {
    title: 'posting 2',
    id: 2,
    favorites: [],
    user_profile_id: 1,
  },
  {
    title: 'posting 3',
    id: 3,
    favorites: [],
    user_profile_id: 2,
  },
];

describe('postings filters', () => {
  it('should return the posting with the provided id', () => {
    expect(postingById(2, postings)).toEqual(postings[1]);
  });

  it('should not return a posting if no posting with provided id is found', () => {
    expect(postingById(4, postings)).toBeFalsy();
  });

  it('should return postings favorited by user', () => {
    expect(postingsFavoritedByUser(user.id, postings)).toEqual([postings[0]]);
  });

  it('should return an empty list of favorites', () => {
    expect(postingsFavoritedByUser(2, postings)).toEqual([]);
  });

  it('should return a list with the postings created by the user', () => {
    expect(postingsByUser(user.id, postings)).toEqual([postings[0], postings[1]]);
  });

  it('should return an empty list if the user has not created any postings', () => {
    expect(postingsByUser(3, postings)).toEqual([]);
  });
});
