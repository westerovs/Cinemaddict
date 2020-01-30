import AbstractComponent from './abstract-component.js';

const MAX_DESCRIPTION_SYMBOLS = 139;
const makeShortDescription = (desc) => desc.slice(0, MAX_DESCRIPTION_SYMBOLS);

const createFilmCardTemplate = (film) => {
  const {poster, name, rating, year, time, genre, description, comments, watched, favorite, watchlist} = film;
  return (
    `<article class="film-card">
    <h3 class="film-card__title">${name}</h3>
       <p class="film-card__rating">${rating}</p>
       <p class="film-card__info">
         <span class="film-card__year">${year}</span>
         <span class="film-card__duration">${time}</span>
         <span class="film-card__genre">${genre}</span>
       </p>
       <img src="./images/posters/${poster}" alt="" class="film-card__poster">
       <p class="film-card__description">
        ${makeShortDescription(description)}...
       </p>
       <a class="film-card__comments">${comments} comments</a>
       <form class="film-card__controls">
         <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
         <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
         <button class="film-card__controls-item button film-card__controls-item--favorite ${favorite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
       </form>
    </article>`
  );
};


export default class FilmCardComponent extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  setPosterClickHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, handler);
  }

  setTitleClickHandler(handler) {
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, handler);
  }

  setCommentsClickHandler(handler) {
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, handler);
  }
}
