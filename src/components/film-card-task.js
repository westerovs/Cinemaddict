import {
  randomItem,
  FilmName,
  randomNumber,
  Posters,
  filmGenre
} from '../mock/task.js';


// TASK Карточка фильма
export const createFilmCardTaskTemplate = () => (
  `<article class="film-card">
    <h3 class="film-card__title">${randomItem(FilmName)}</h3>
    <p class="film-card__rating">${randomNumber(1, 10)}.${randomNumber(1, 10)}</p>
    <p class="film-card__info">
      <span class="film-card__year">${randomNumber(1950, 2077)}</span>
      <span class="film-card__duration">${randomNumber()}h ${randomNumber()}m</span>
      <span class="film-card__genre">${randomItem(filmGenre)}</span>
    </p>
    <img src="./images/posters/${randomItem(Posters)}" alt="" class="film-card__poster">
    <p class="film-card__description">

    </p>
    <a class="film-card__comments">${randomNumber()} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
    </form>
  </article>`
);
