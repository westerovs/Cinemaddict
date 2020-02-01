import debounce from 'lodash/debounce';
import AbstractSmartComponent from './abstract-smart-component';
import {Emotions} from '../const';
import {
  formatDuration,
  formatDate,
  formatRelativeTime,
  createRatingText,
} from '../utils/common';


const DEBOUNCE_TIMEOUT = 500;

const createGenresMarkup = (genres) => genres
  .map((genre) => `<span class="film-details__genre">${genre}</span>`)
  .join(`\n`);

const createControlItemMarkup = (name, labelText, isActive) => {
  return `<input
    type="checkbox"
    class="film-details__control-input visually-hidden"
    id="${name}"
    name="${name}"
    ${isActive ? `checked` : ``}>
  <label
    for="${name}"
    class="film-details__control-label film-details__control-label--${name}"
  >${labelText}</label>`;
};

const createRatingScoreMarkup = (userRating) => {
  const from = 1;
  const to = 9;
  const result = [];

  for (let i = from; i <= to; i++) {
    result.push(`<input
      type="radio"
      name="score"
      class="film-details__user-rating-input visually-hidden"
      value="${i}"
      id="rating-${i}"
      ${userRating === i ? `checked` : ``}
    >
    <label
      class="film-details__user-rating-label"
      for="rating-${i}"
    >${i}</label>`);
  }

  return result.join(`\n`);
};

const createCommentsListMarkup = (comments) => comments
  .map((comment) => {
    const {id, text, emotion, author, date} = comment;
    return `<li class="film-details__comment" data-comment-id="${id}">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji">
    </span>
    <div>
      <p class="film-details__comment-text">${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${formatRelativeTime(date)}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
  })
  .join(`\n`);

const createEmojiMarkup = (activeEmotion) => Emotions
  .map((emotion) => {
    return `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}" ${emotion === activeEmotion ? `checked` : ``}>
    <label class="film-details__emoji-label" for="emoji-${emotion}">
      <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
    </label>`;
  })
  .join(`\n`);

const createSelectedEmotionMarkup = (emotion) => {
  return emotion ? `<img src="images/emoji/${emotion}.png" width="55" height="55" alt="emoji">` : ``;
};

const createGenresTitleText = (genres) => genres.length > 1 ? `Genres` : `Genre`;


const createFilmDetailsTemplate = (film, options = {}) => {
  const {
    filmInfo,
    userRating,
    isInWatchlist,
    isWatched,
    isFavorite,
    comments,
  } = film;

  const {
    title,
    alternativeTitle,
    totalRating,
    poster,
    ageRating,
    director,
    writers,
    actors,
    releaseDate,
    releaseCountry,
    duration,
    genres,
    description,
  } = filmInfo;

  const {emotion, commentText} = options;

  const watchlistItem = createControlItemMarkup(`watchlist`, `Add to watchlist`, isInWatchlist);
  const watchedItem = createControlItemMarkup(`watched`, `Already watched`, isWatched);
  const favoriteItem = createControlItemMarkup(`favorite`, `Add to favorites`, isFavorite);

  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${poster}" alt="${title}">

            <p class="film-details__age">${ageRating}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${alternativeTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${createRatingText(totalRating)}</p>
                ${userRating ? `<p class="film-details__user-rating">Your rate ${userRating}</p>` : ``}
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers.join(`, `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors.join(`, `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${formatDate(releaseDate)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${formatDuration(duration)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${releaseCountry}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${createGenresTitleText(genres)}</td>
                <td class="film-details__cell">${createGenresMarkup(genres)}</td>
              </tr>
            </table>

            <p class="film-details__film-description">${description}</p>
          </div>
        </div>

        <section class="film-details__controls">
          ${watchlistItem}
          ${watchedItem}
          ${favoriteItem}
        </section>
      </div>

      ${isWatched ? `<div class="form-details__middle-container">
        <section class="film-details__user-rating-wrap">
          <div class="film-details__user-rating-controls">
            <button class="film-details__watched-reset" type="button">Undo</button>
          </div>

          <div class="film-details__user-score">
            <div class="film-details__user-rating-poster">
              <img src="${poster}" alt="film-poster" class="film-details__user-rating-img">
            </div>

            <section class="film-details__user-rating-inner">
              <h3 class="film-details__user-rating-title">${title}</h3>

              <p class="film-details__user-rating-feelings">How you feel it?</p>

              <div class="film-details__user-rating-score">
                ${createRatingScoreMarkup(userRating)}
              </div>
            </section>
          </div>
        </section>
      </div>` : ``}

      <div class="form-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

          <ul class="film-details__comments-list">
            ${createCommentsListMarkup(comments)}
          </ul>

          <div class="film-details__new-comment">
            <div for="add-emoji" class="film-details__add-emoji-label">
            ${createSelectedEmotionMarkup(emotion)}
            </div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${commentText || ``}</textarea>
            </label>

            <div class="film-details__emoji-list">
              ${createEmojiMarkup(emotion)}
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};


export default class FilmDetails extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;

    this.emotion = null;
    this.commentText = null;

    this._watchlistItemClickHandler = null;
    this._watchedItemClickHandler = null;
    this._favoriteItemClickHandler = null;
    this._userRatingClickHandler = null;
    this._undoUserRatingClickHandler = null;
    this._deleteCommentClickHandler = null;
    this._submitCommentHandler = null;
    this._closeButtonHandler = null;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film, {
      emotion: this.emotion,
      commentText: this.commentText,
    });
  }

  recoveryListeners() {
    this.setWatchlistItemClickHandler(this._watchlistItemClickHandler);
    this.setWatchedItemClickHandler(this._watchedItemClickHandler);
    this.setFavoriteItemClickHandler(this._favoriteItemClickHandler);
    this.setUserRatingClickHandler(this._userRatingClickHandler);
    this.setUndoUserRatingClickHandler(this._undoUserRatingClickHandler);
    this.setDeleteCommentClickHandler(this._deleteCommentClickHandler);
    this.setSubmitCommentHandler(this._submitCommentHandler);
    this.setCloseButtonHandler(this._closeButtonHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  reset() {
    this.emotion = null;
    this.commentText = null;
    this.rerender();
  }

  setWatchlistItemClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, debounce(handler, DEBOUNCE_TIMEOUT));

    this._watchlistItemClickHandler = handler;
  }

  setWatchedItemClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, debounce(handler, DEBOUNCE_TIMEOUT));

    this._watchedItemClickHandler = handler;
  }

  setFavoriteItemClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, debounce(handler, DEBOUNCE_TIMEOUT));

    this._favoriteItemClickHandler = handler;
  }

  setUserRatingClickHandler(handler) {
    const userRatingElement = this.getElement().querySelector(`.film-details__user-rating-score`);
    if (userRatingElement) {
      userRatingElement.addEventListener(`change`, handler);
    }

    this._userRatingClickHandler = handler;
  }

  setUndoUserRatingClickHandler(handler) {
    const undoUserRatingButton = this.getElement().querySelector(`.film-details__watched-reset`);
    if (undoUserRatingButton) {
      undoUserRatingButton.addEventListener(`click`, handler);
    }

    this._undoUserRatingClickHandler = handler;
  }

  setDeleteCommentClickHandler(handler) {
    this.getElement().querySelectorAll(`.film-details__comment-delete`)
      .forEach((deleteButton) => {
        deleteButton.addEventListener(`click`, handler);
      });

    this._deleteCommentClickHandler = handler;
  }

  setSubmitCommentHandler(handler) {
    this.getElement().addEventListener(`keydown`, handler);
    this._submitCommentHandler = handler;
  }

  setCloseButtonHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);

    this._closeButtonHandler = handler;
  }

  getClosestComment(deleteCommentButton) {
    return deleteCommentButton.closest(`.film-details__comment`);
  }

  getCommentForm() {
    return this.getElement().querySelector(`.film-details__comment-input`);
  }

  getUserRatingInputs() {
    return this.getElement().querySelectorAll(`.film-details__user-rating-input`);
  }

  _subscribeOnEvents() {
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`change`, (evt) => {
      const emotion = evt.target.value;
      this.emotion = emotion;
      this.rerender();
    });

    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`input`, (evt) => {
      this.commentText = evt.target.value;
    });
  }
}
