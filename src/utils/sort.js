import {SortType} from "../components/sort";

export const getSortedFilms = (filmList, sortType) => {
  let sortedFilms = [];

  switch (sortType) {
    case SortType.DATE:
      sortedFilms = filmList.slice().sort((a, b) => b.year - a.year);
      break;
    case SortType.RATING:
      sortedFilms = filmList.slice().sort((a, b) => b.rating - a.rating);
      break;
    case SortType.DEFAULT:
      sortedFilms = filmList;
      break;
  }

  return sortedFilms;
};
