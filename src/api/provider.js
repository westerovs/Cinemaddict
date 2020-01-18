import Movie from "../models/movie";

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
    this._isSync = true;
  }

  getMovies() {
    if (this._isOnline()) {
      return this._api.getMovies()
        .then((movies) => {
          movies.forEach((movie) => this._store.setItem(movie.id, Movie.toRAW(movie)));
          return movies;
        });
    }
    const data = this._store.getData();

    return Promise.resolve(Movie.parseMovieList(Object.values(data)));
  }

  getComments(id) {
    const [film] = this._store.getItem(id);

    if (this._isOnline()) {
      return this._api.getComments(id)
        .then((comments) => {
          film.commentsList = comments;
          this._store.setItem(id, film);
          return comments;
        });
    }

    return Promise.resolve(film.commentsList ? film.commentsList : null);
  }

  updateMovie(id, newData) {
    this._store.setItem(id, Movie.toRAW(newData));

    if (this._isOnline()) {
      return this._api.updateMovie(id, newData);
    }
    this._isSync = false;
    return null;
  }

  createComment(id, data) {
    if (this._isOnline()) {
      return this._api.createComment(id, data);
    }
    return Promise.reject(``);
  }

  deleteComment(commentId) {
    if (this._isOnline()) {
      return this._api.deleteComment(commentId);
    }
    return null;
  }

  sync() {
    if (!this._isSync && this._isOnline()) {
      const data = Object.values(this._store.getData());

      this._api.sync(data)
        .then((syncData) => {
          syncData.updated.forEach((movie) => this._store.setItem(movie.id, Movie.toRAW(movie)));
          this._isSync = true;
        });
    }
  }

  _isOnline() {
    return window.navigator.onLine;
  }
}
