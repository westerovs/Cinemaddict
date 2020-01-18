import {SortType} from "../components/sort";
import {getYear} from "./helpers";

export const getSortedFilms = (filmList, sortType) => {
  let sortedFilms = [];

  switch (sortType) {
    case SortType.DATE:
      sortedFilms = filmList.slice().sort((a, b) => getYear(b.date) - getYear(a.date));
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
