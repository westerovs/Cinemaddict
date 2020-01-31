import FilmListComponent from './components/film-list.js';
import PageControllerComponent from './controllers/page-controller.js';
import {render} from './utils/render.js';


const siteMainElement = document.querySelector(`.main`);
const filmsListComponent = new FilmListComponent();

render(siteMainElement, filmsListComponent);


const pageControllerComponent = new PageControllerComponent(filmsListComponent);
pageControllerComponent.test();
pageControllerComponent.render();

// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// // ----------------------- Component --------------------------
// import ProfileComponent from './components/profile.js';
// import FilterNavComponent from './components/filter-nav.js';
// import SortComponent from './components/sort.js';
// import FilmsListComponent from './components/film-list.js';
// import BtnShowMoreComponent from './components/btn-show-more.js';
// // outher
// import {createRandomFilms} from './mock/generate-film.js';
// import {render} from './utils/render.js';
// import {renderFilm} from './controller/page-controller.js';


// const FUCKING_FILMS_MAX_COUNT = (555 + (777 - 111) + 343) + (73 * 6) - 1989;

// const FILMS_SHOWING_ON_START = 5;
// const FILMS_SHOWING_BY_BUTTON = 5;
// const FILMS_EXTRA_COUNT = 2;
// const SLICE_ELEMENT_INDEX = 0;
// // количество показываемых карточек
// let showingCardsMore = FILMS_SHOWING_ON_START;


// // ----------------- главный массив с фильмами -----------------
// const films = createRandomFilms(FUCKING_FILMS_MAX_COUNT);
// // Get количество всех фильмов
// const allFilmsQuantity = films.length;


// // ----------------- Get mains container -----------------------
// const siteMainElement = document.querySelector(`.main`);
// const siteHeaderElement = document.querySelector(`.header`);
// export const siteFooterElement = document.querySelector(`.footer`);


// // ----------------- Get шаблон списка фильмов, render его в main
// const filmsListComponent = new FilmsListComponent();
// const filmsList = filmsListComponent.getElement().querySelector(`.films-list`);
// const filmsListContainerElement = filmsList.querySelector(`.films-list__container`);


// // ----------------- render ------------------------------------
// render(siteMainElement, new FilterNavComponent(films).getElement());
// render(siteHeaderElement, new ProfileComponent().getElement());
// render(siteMainElement, new SortComponent().getElement());
// render(siteMainElement, filmsListComponent.getElement());


// // ★ --------------- renderFilms в film-list ---------------- ★
// const renderFilms = () => {
//   for (const itemFilm of films.slice(SLICE_ELEMENT_INDEX, showingCardsMore)) {
//     renderFilm(filmsListContainerElement, itemFilm);
//   }


//   // проверка есть ли фильм, если нет то сообщение
//   if (films.length === 0) {
//     const listTitle = filmsList.querySelector(`.films-list__title`);
//     listTitle.classList.remove(`visually-hidden`);
//     listTitle.innerHTML = `There are no movies in our database`;
//   }
// };
// renderFilms();


// // ★ --------------- remove фильмов из film-list ------------ ★
// const removeFilms = () => {
//   const filmElementsAll = filmsList.querySelectorAll(`.film-card`);
//   filmElementsAll.forEach((film) => film.remove());
// };


// // ----------------- sorting -----------------------------------
// const btnSortDefault = document.querySelector(`.sort__button-default`);
// const btnSortDate = document.querySelector(`.sort__button-date`);
// const btnSortRating = document.querySelector(`.sort__button-rating`);

// const btnsSortArr = [btnSortDefault, btnSortDate, btnSortRating];

// const sortFilms = (event) => {
//   let field;

//   switch (event.target) {
//     case btnSortDefault:
//       field = `name`;
//       break;
//     case btnSortDate:
//       field = `year`;
//       break;
//     case btnSortRating:
//       field = `rating`;
//       break;
//     default:
//       return;
//   }

//   btnsSortArr.forEach((btn) => {
//     btn.classList.remove(`sort__button--active`);

//     if (btn === event.target) {
//       btn.classList.add(`sort__button--active`);
//     }
//   });

//   const sortFunction = (a, b) => b[field] > a[field] ? 1 : -1;

//   films.sort(sortFunction);
//   removeFilms();
//   renderFilms();
// };

// btnsSortArr.forEach((btn) => {
//   if (btn) {
//     btn.onclick = sortFilms;
//   }
// });


// // ----------------- Get Top rated/Most commented --------------
// const topRatedFilmsList = siteMainElement.querySelector(`#top-rated`);
// const mostCommentedFilmsList = siteMainElement.querySelector(`#most-commented`);

// const topRatedFilms = films
//   .filter((film) => film.rating > 0)
//   .sort((a, b) => b.rating - a.rating)
//   .slice(SLICE_ELEMENT_INDEX, FILMS_EXTRA_COUNT);
// for (const itemFilm of topRatedFilms) {
//   renderFilm(topRatedFilmsList, itemFilm);
// }

// const mostCommentFilms = films
//   .filter((film) => film.comments > 0)
//   .sort((a, b) => b.comments - a.comments)
//   .slice(SLICE_ELEMENT_INDEX, FILMS_EXTRA_COUNT);
// for (const itemFilm of mostCommentFilms) {
//   renderFilm(mostCommentedFilmsList, itemFilm);
// }


// // ----------------- кнопка ShowMore ---------------------------
// const btnShowMoreElement = new BtnShowMoreComponent().getElement();
// render(filmsList, btnShowMoreElement);

// // получаю компонент кнопки в переменную
// const btnShowMore = filmsList.querySelector(`.films-list__show-more`);

// btnShowMore.onclick = () => {
//   const addShowingCardsMore = showingCardsMore;
//   showingCardsMore += FILMS_SHOWING_BY_BUTTON;

//   for (const itemFilm of films.slice(addShowingCardsMore, showingCardsMore)) {
//     renderFilm(filmsListContainerElement, itemFilm);
//   }

//   if (showingCardsMore >= FUCKING_FILMS_MAX_COUNT) {
//     btnShowMoreElement.remove();
//   }
// };


// // ----------------- Oбщее количество фильмов в подвалe --------
// const footerStatisticsElement = siteFooterElement.querySelector(`.footer__statistics p`);
// footerStatisticsElement.textContent = `${allFilmsQuantity} movies inside`;

