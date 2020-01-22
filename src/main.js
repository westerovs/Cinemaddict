// -------------------------------------------------------------
// ----------------------- компоненты --------------------------
import ProfileComponent from './components/profile.js';
import NavigationComponent from './components/navigation.js';
import SortComponent from './components/sort.js';
import FilmsListComponent from './components/film-list.js';
import FilmCardComponent from './components/film-card.js';
import BtnShowMoreComponent from './components/btn-show-more.js';
// разное
import {createRandomFilms} from './mock/generate-film.js';
import {render, RenderPosition} from './utils.js';


// -------------------------------------------------------------
// ----------------------- main containers ---------------------
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);


// -------------------------------------------------------------
// ----------------------  cчётчик отрисовки -------------------
const FILMS_COUNT = 22;
const FILMS_EXTRA_COUNT = 2;
const FILMS_SHOWING_ON_START = 5;
const FILMS_SHOWING_BY_BUTTON = 5;


// -------------------------------------------------------------
// ----------------------- массив с фильмами -------------------

/* Сохраняет массив моков-объекты карточек фильма */
const films = createRandomFilms(FILMS_COUNT);


// -------------------------------------------------------------
const watchlistFilmsCount = films.filter((item) => item.watchlist).length;
const watchedFilmsCount = films.filter((item) => item.watched).length;
const favoriteFilmsCount = films.filter((item) => item.favorite).length;


// -------------------------------------------------------------
// самые рейтинговые фильмы
const topRatedFilms = films
  .filter((film) => film.rating > 0)
  .sort((a, b) => b.rating - a.rating)
  .slice(0, FILMS_EXTRA_COUNT);


// самые комм. фильмы
const mostCommentFilms = films
  .filter((film) => film.comments > 0)
  .sort((a, b) => b.comments - a.comments)
  .slice(0, FILMS_EXTRA_COUNT);


// -------------------------------------------------------------
// ----------------------- рендер на страницу ------------------
render(siteHeaderElement, new ProfileComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new NavigationComponent(watchlistFilmsCount, watchedFilmsCount, favoriteFilmsCount).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilmsListComponent().getElement(), RenderPosition.BEFOREEND);


// -------------------------------------------------------------
// ----------------------- функция отрисовки фильмов -----------
const filmList = siteMainElement.querySelector(`.films-list__container`);

function renderFilms(element, count = films) {
  const fragment = document.createDocumentFragment();

  count.forEach((film) => {
    fragment.appendChild(new FilmCardComponent(film).getElement());
  });

  element.appendChild(fragment);
}
renderFilms(filmList);


// -------------------------------------------------------------
// ----------------------- экстра фильмы -----------------------
const topRatedFilmsList = siteMainElement.querySelector(`#top-rated`);
const mostCommentedFilmsList = siteMainElement.querySelector(`#most-commented`);
topRatedFilmsList.style.outline = `2px dashed gold`;
mostCommentedFilmsList.style.outline = `2px dashed gold`;


// -------------------------------------------------------------
// ----------------------- добавить карточек -------------------

const boardElement = siteMainElement.querySelector(`.films-list`);
render(boardElement, new BtnShowMoreComponent().getElement(), RenderPosition.BEFOREEND);
const btnShowMore = siteMainElement.querySelector(`.films-list__show-more`);

btnShowMore.onclick = () => {
  renderFilms(filmList, films);
  const allFilmCard = siteMainElement.querySelectorAll(`.films-list .film-card`);
  if (allFilmCard.length >= 15) {
    btnShowMore.style.display = `none`;
  }
};


// -------------------------------------------------------------
// ----------------------- sort rating -------------------------
// const filmsListContainer = document.querySelector(`.films-list__container`);
// const allFilmCard = document.querySelectorAll(`.films-list .film-card`);

// // получаю кнопки
// // const btnSortDefault = document.querySelector(`.sort__button-default`);
// // const btnSortDate = document.querySelector(`.sort__button-date`);
// const btnSortRating = document.querySelector(`.sort__button-rating`);

// function getSort(arr, data, place) {
//   let sorting = [...arr].sort((a, b) => {
//     return a.getAttribute(data) - b.getAttribute(data);
//   });

//   let toString = ``;
//   for (let item of sorting) {
//     toString += item.outerHTML;
//   }

//   place.innerHTML = toString;
// }

// // сортировка по рейтингу
// btnSortRating.addEventListener(`click`, () => {
//   getSort(allFilmCard, `data-rating`, filmsListContainer);
// });
