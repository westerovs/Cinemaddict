import {getFilmsByFilter} from '../utils/filter';
import {FilterType} from '../const';


export default class Movies {
  constructor() {
    this._movies = [];
    this._activeFilterType = FilterType.ALL;

    this._dataChangeHandlers = [];

    this._filterChangeHandlers = [];
  }

  getMovies() {
    return getFilmsByFilter(this._movies, this._activeFilterType);
  }

  getMoviesByFilter(filterType) {
    return getFilmsByFilter(this._movies, filterType);
  }

  getMoviesAll() {
    return this._movies;
  }

  setMovies(movies) {
    this._movies = Array.from(movies);
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  updateMovie(id, movie) {
    const index = this._movies.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._movies = [].concat(this._movies.slice(0, index), movie, this._movies.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  hasRatings() {
    return this._movies.some((movie) => !!movie.filmInfo.totalRating);
  }

  hasComments() {
    return this._movies.some(({comments}) => !!comments.length);
  }

  getSortedMoviesByRating() {
    return this._movies.slice().sort((a, b) => {
      return b.filmInfo.totalRating - a.filmInfo.totalRating;
    });
  }

  getSortedMoviesByCommentsCount() {
    return this._movies.slice().sort((a, b) => b.comments.length - a.comments.length);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
