export const generateFilters = (films) => {
  return [
    {
      title: `Watchlist`,
      type: `watchlist`,
      count: films.filter((film) => film.isInWatchlist).length
    },
    {
      title: `History`,
      type: `history`,
      count: films.filter((film) => film.isWatched).length
    },
    {
      title: `Favorites`,
      type: `favorites`,
      count: films.filter((film) => film.isFavorite).length
    }
  ];
};
