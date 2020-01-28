import AbstractComponent from './abstract-component.js';


// ******************** шаблон фильма *********************
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

// класс наследуется от AпbstractComponent
export default class FilmCardComponent extends AbstractComponent {
  constructor(film) {
    // Ключевое слово super используется для вызова функций, принадлежащих родителю объекта.
    // В конструкторе ключевое слово super() используется как функция, вызывающая родительский конструктор. Её необходимо вызвать до первого обращения к ключевому слову this в теле конструктора. Ключевое слово super также может быть использовано для вызова функций родительского объекта.
    super();

    this._film = film;
  }

  // переопределяю метод getTemplate из интерфейса и говорю, что для film у меня метод getTemplate выглядит так
  getTemplate() {
    return createFilmCardTemplate(this._film);
  }
}
