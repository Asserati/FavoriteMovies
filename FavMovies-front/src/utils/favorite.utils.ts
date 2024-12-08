const favoriteUtils = {
  check: ({ listFavorites, mediaId }) =>
    listFavorites && listFavorites.some((e) => e.mediaId === mediaId),
};

export default favoriteUtils;
