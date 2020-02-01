import {FilterType} from '../const';


const getWatchlistFilms = (films) => films.filter((film) => film.isInWatchlist);
const getWatchedFilms = (films) => films.filter((film) => film.isWatched);
const getFavoritesFilms = (films) => films.filter((film) => film.isFavorite);

const getFilmsByFilter = (films, filterType) => {
  switch (filterType) {
    case FilterType.WATCHLIST:
      return getWatchlistFilms(films);
    case FilterType.HISTORY:
      return getWatchedFilms(films);
    case FilterType.FAVORITES:
      return getFavoritesFilms(films);
  }

  return films;
};


export {
  getWatchlistFilms,
  getWatchedFilms,
  getFavoritesFilms,
  getFilmsByFilter,
};
