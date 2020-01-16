import {FilterTypes} from "../utils/const";
import {SortType} from "../components/sort";
import {getFilmsByFilter} from "../utils/filter";
import {getSortedFilms} from "../utils/sort";

export default class Movies {
  constructor() {
    this._filmList = [];
    this._activeFilterType = FilterTypes.DEFAULT;
    this._activeSortType = SortType.DEFAULT;
    this._filterChangeHandlers = [];
    this._dataChangeHandlers = [];
  }

  get filmListDefault() {
    return this._filmList;
  }

  set filmList(filmList) {
    this._filmList = Array.from(filmList);
  }

  get sortType() {
    return this._activeSortType;
  }

  set sortType(type) {
    this._activeSortType = type;
  }

  getFilmList() {
    let filmList = this._filmList;

    if (this._activeFilterType !== FilterTypes.DEFAULT) {
      filmList = getFilmsByFilter(this._filmList, this._activeFilterType);
    }

    if (this._activeSortType !== SortType.DEFAULT) {
      filmList = getSortedFilms(filmList, this._activeSortType);
    }

    return filmList;
  }

  updateFilm(id, film) {
    const index = this._filmList.findIndex((it) => it.id === id);

    if (index !== -1) {
      this._filmList[index] = film;
      this._dataChangeHandlers.forEach((handler) => handler());

      // Удаляем последний добавленный обработчик для конкретного контроллера фильма,
      // чтобы не вызывать его при каждом обновлении данных
      this._dataChangeHandlers.pop();
      return true;
    }

    return false;
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._filterChangeHandlers.forEach((handler) => handler());
  }

  onFilterChange(handler) {
    this._filterChangeHandlers.push(handler);
  }

  onDataChange(handler) {
    this._dataChangeHandlers.push(handler);
  }
}
