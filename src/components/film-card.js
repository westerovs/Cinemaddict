import {formatTime} from "../utils/helpers";
import SmartComponent from "./smart-component";

export default class FilmCard extends SmartComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getCardControlsTemplate() {
    const film = this._film;

    return `<form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${film.isInWatchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${film.isWatched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${film.isFavorite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
    </form>`;
  }

  getTemplate() {
    const film = this._film;
    const duration = formatTime(film.duration);
    const description = film.description.length > 139 ? film.description.substring(0, 139) + `...` : film.description;

    return `<article class="film-card">
    <h3 class="film-card__title">${film.title}</h3>
    <p class="film-card__rating">${film.rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${film.year}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${film.genres}</span>
    </p>
    <img src="./images/posters/${film.poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <a class="film-card__comments">${film.comments.length} comments</a>
    ${this.getCardControlsTemplate()}
  </article>`;
  }

  // Частичный перерендер элементов компонента, обладающего анимацией,
  // чтобы не вызывать при вызове rerender() эту анимацию
  rerender() {
    this.getElement().querySelector(`.film-card__controls`).innerHTML = this.getCardControlsTemplate();
    this.getElement().querySelector(`.film-card__comments`).textContent = `${this._film.comments.length} comments`;

    this.recoverListeners();
  }

  set film(newFilm) {
    this._film = newFilm;
  }

  onFilmClick(handler) {
    this._onFilmClick = handler;
    this.getElement().addEventListener(`click`, handler);
  }

  onAddToWatchlistClick(handler) {
    this._onAddToWatchlistClick = handler;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, handler);
  }

  onMarkAsWatchedClick(handler) {
    this._onMarkAsWatchedClick = handler;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, handler);
  }

  onFavoriteClick(handler) {
    this._onFavoriteClick = handler;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, handler);
  }

  recoverListeners() {
    this._subscribeOnEvents();
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.addEventListener(`click`, this._onFilmClick);
    element.querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._onAddToWatchlistClick);
    element.querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._onMarkAsWatchedClick);
    element.querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._onFavoriteClick);
  }
}
