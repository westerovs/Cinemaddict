import {formatTime} from "../utils/helpers";
import Component from "./component";

export default class FilmCard extends Component {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    const film = this._film;
    const duration = formatTime(film.duration);

    return `<article class="film-card">
    <h3 class="film-card__title">${film.title}</h3>
    <p class="film-card__rating">${film.rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${film.year}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${film.genres}</span>
    </p>
    <img src="./images/posters/${film.poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${film.description}</p>
    <a class="film-card__comments">${film.comments.length} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${film.isInWatchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${film.isWatched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${film.isFavorite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
    </form>
  </article>`;
  }

  onFilmClick(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

  onAddToWatchlistClick(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, handler);
  }

  onMarkAsWatchedClick(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, handler);
  }

  onFavoriteClick(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, handler);
  }
}
