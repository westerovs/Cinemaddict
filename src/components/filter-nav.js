import AbstractComponent from './abstract-component.js';


const createNavigationTemplate = function (films) {
  const watchlistFilmsCount = films.filter((item) => item.watchlist).length;
  const watchedFilmsCount = films.filter((item) => item.watched).length;
  const favoriteFilmsCount = films.filter((item) => item.favorite).length;
  return (
    `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">
        All movies
      </a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlistFilmsCount}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${watchedFilmsCount}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favoriteFilmsCount}</span></a>
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`
  );
};


export default class FilterNavComponent extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createNavigationTemplate(this._films);
  }
}

