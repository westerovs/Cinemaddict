export const generateFilters = (films) => {
  return [
    {
      title: `Watchlist`,
      count: films.filter((film) => film.isInWatchlist).length
    },
    {
      title: `History`,
      count: films.filter((film) => film.isWatched).length
    },
    {
      title: `Favorites`,
      count: films.filter((film) => film.isFavorite).length
    }
  ];
};
