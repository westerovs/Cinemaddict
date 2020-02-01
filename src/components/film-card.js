import debounce from 'lodash/debounce';
import AbstractComponent from './abstract-component';
import {
  formatDuration,
  formatYear,
  createRatingText,
  convertTextToKebabCase,
} from './../utils/common';


const MAX_DESCRIPTION_LENGTH = 140;
const DEBOUNCE_TIMEOUT = 500;

const createControlItemMarkup = (name, isActive) => {
  return `<button
  type="button"
  class="film-card__controls-item button
  film-card__controls-item--${convertTextToKebabCase(name)}
  ${isActive ? `film-card__controls-item--active` : ``}
">${name}</button>`;
};

const createDescriptionText = (description) => {
  if (description.length < MAX_DESCRIPTION_LENGTH) {
    return description;
  }

  return `${description.slice(0, MAX_DESCRIPTION_LENGTH - 3)}...`;
};

const createCommentsTitleText = (comments) => {
  switch (comments.length) {
    case 0:
      return `no comments yet`;
    case 1:
      return `1 comment`;
    default:
      return `${comments.length} comments`;
  }
};

const createMainGenreText = (genres) => {
  if (!genres.length) {
    return ``;
  }

  return genres[0];
};


const createFilmCardTemplate = (film) => {
  const {
    filmInfo,
    isInWatchlist,
    isWatched,
    isFavorite,
    comments,
  } = film;

  const {
    title,
    totalRating,
    poster,
    releaseDate,
    duration,
    genres,
    description,
  } = filmInfo;

  const watchlistButton = createControlItemMarkup(`Add to watchlist`, isInWatchlist);
  const watchedButton = createControlItemMarkup(`Mark as watched`, isWatched);
  const favoriteButton = createControlItemMarkup(`Favorite`, isFavorite);

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${createRatingText(totalRating)}</p>
    <p class="film-card__info">
      <span class="film-card__year">${formatYear(releaseDate)}</span>
      <span class="film-card__duration">${formatDuration(duration)}</span>
      <span class="film-card__genre">${createMainGenreText(genres)}</span>
    </p>
    <img src="${poster}" alt="${title}" class="film-card__poster">
    <p class="film-card__description">${createDescriptionText(description)}</p>
    <a class="film-card__comments">${createCommentsTitleText(comments)}</a>
    <form class="film-card__controls">
      ${watchlistButton}
      ${watchedButton}
      ${favoriteButton}
    </form>
  </article>`;
};

export default class FilmCard extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  setFilmPosterClickHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`)
      .addEventListener(`click`, handler);
  }

  setFilmTitleClickHandler(handler) {
    this.getElement().querySelector(`.film-card__title`)
      .addEventListener(`click`, handler);
  }

  setFilmCommentsClickHandler(handler) {
    this.getElement().querySelector(`.film-card__comments`)
      .addEventListener(`click`, handler);
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, debounce(handler, DEBOUNCE_TIMEOUT));
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, debounce(handler, DEBOUNCE_TIMEOUT));
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, debounce(handler, DEBOUNCE_TIMEOUT));
  }
}
