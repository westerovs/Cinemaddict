import {createElement} from '../utils.js';
import {render, RenderPosition} from '../utils.js';
import PopArtFilmlComponent from '../components/popUp.js';
import Comments from './comments.js';


// // ******************** шаблон фильма *********************
const createFilmCardTemplate = (film) => {
  const {poster, name, rating, year, time, genre, description, comments, watched, favorite, watchlist} = film;
  return (
    `<article class="film-card" data-rating="${rating}">
    <h3 class="film-card__title">${name}</h3>
       <p class="film-card__rating">${rating}</p>
       <p class="film-card__info">
         <span class="film-card__year">${year}</span>
         <span class="film-card__duration">${time}</span>
         <span class="film-card__genre">${genre}</span>
       </p>
       <img src="./images/posters/${poster}" alt="" class="film-card__poster">
       <p class="film-card__description">
        ${description}
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


export default class FilmCardComponent {
  constructor(film) {
    this._comments = new Comments(film.comments);
    this._popUp = new PopArtFilmlComponent(film);
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      // обложка, постер, комментарии
      // const poster = this._element.querySelector(`.film-card__poster`);
      // const filmTitle = this._element.querySelector(`.film-card__title`);
      // const comment = this._element.querySelector(`.film-card__comments`);
      // poster.onclick = () => {
      //   this.showPopUp();
      // };
      // filmTitle.onclick = () => {
      //   this.showPopUp();
      // };
      // comment.onclick = () => {
      //   this.showPopUp();
      // };
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  // вызвать popUp
  showPopUp() {
    const popUp = this._popUp.getElement();
    render(document.body, popUp, RenderPosition.BEFOREEND);
    const commentsContainer = popUp.querySelector(`.form-details__bottom-container`);
    render(commentsContainer, this._comments.getElement(), RenderPosition.BEFOREEND);
    // закрыть popUp
    document.addEventListener(`keydown`, function (evt) {
      if (evt.keyCode === 27) {
        if (popUp) {
          popUp.remove();
        }
      }
    });
  }
}

