export const postingById = (id, postings) => postings.filter(posting => posting.id === id)[0];
export const postingsFavoritedByUser = (u, ps) => {
  const fp = ps.filter(p => p.favorites.some(f => f.user_profile_id === u));
  return fp;
};
