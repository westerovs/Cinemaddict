import {createElement} from '../utils.js';


const createNavigationTemplate = function (watchlist, history, favorites) {
  return (
    `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">
        All movies
      </a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlist}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${history}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favorites}</span></a>
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`
  );
};


export default class FilterNavComponent {
  constructor(watchlist, history, favorites) {
    this._watchlist = watchlist;
    this._history = history;
    this._favorites = favorites;
    this._element = null;
  }

  getTemplate() {
    return createNavigationTemplate(this._watchlist, this._history, this._favorites);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

