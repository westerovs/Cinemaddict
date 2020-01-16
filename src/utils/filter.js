import {FilterTypes} from "./const";

export const getFilmsByFilter = (filmList, filterType) => {
  let result = [];

  switch (filterType) {
    case FilterTypes.DEFAULT:
      result = filmList;
      break;
    case FilterTypes.FAVORITES:
      result = filmList.filter((film) => film.isFavorite);
      break;
    case FilterTypes.HISTORY:
      result = filmList.filter((film) => film.isWatched);
      break;
    case FilterTypes.WATCHLIST:
      result = filmList.filter((film) => film.isInWatchlist);
  }

  return result;
};
