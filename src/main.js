// -------------------------------------------------------------
// ----------------------- компоненты --------------------------
import ProfileComponent from './components/profile.js';
import NavigationComponent from './components/navigation.js';
import SortComponent from './components/sort.js';
import FilmsListComponent from './components/film-list.js';
import FilmCardComponent from './components/film-card.js';
import BtnShowMoreComponent from './components/btn-show-more.js';
// popUp and comments
import popUpComponent from './components/popUp.js';
import FilmCommentsComponent from './components/comments.js';
// разное
import {createRandomFilms} from './mock/generate-film.js';
import {render, RenderPosition} from './utils.js';


// -------------------------------------------------------------
// ----------------------  cчётчик отрисовки -------------------
const FILMS_COUNT = 22;
const FILMS_SHOWING_ON_START = 5;
const FILMS_SHOWING_BY_BUTTON = 5;
const FILMS_EXTRA_COUNT = 2;


// -------------------------------------------------------------
// ----------------------- массив с фильмами -------------------
const films = createRandomFilms(FILMS_COUNT);


const FIRST_ELEMENT_INDEX = 0;
/* Сохраняют отфильтрованные (фильтр возвращает карточки только с рейтингом > 0 и количеством комментариев > 0) и отсортированные массивы по рейтингу и комментариям */
// const topRatedFilms = films
//   .filter((film) => film.rating > 0)
//   .sort((a, b) => b.rating - a.rating)
//   .slice(FIRST_ELEMENT_INDEX, FILMS_EXTRA_COUNT);


// // самые комм. фильмы
// const mostCommentFilms = films
//   .filter((film) => film.comments > 0)
//   .sort((a, b) => b.comments - a.comments)
//   .slice(0, FILMS_EXTRA_COUNT);


// ***************************************************************
// ***************************************************************
// ********************* как у врага *****************************
function renderFilm(filmsListElement, film) {
  const filmCardComponent = new FilmCardComponent(film);
  // console.log(filmCardComponent.getElement());
  console.log(filmsListElement);
  // место для popUp

  render(filmsListElement, filmCardComponent.getElement());
}


// Ищет щапку сайта
const siteMainElement = document.querySelector(`.main`);


// Сохраняет компонент списка фильмов, добавляет его в main
const filmsListComponent = new FilmsListComponent();
render(siteMainElement, filmsListComponent.getElement());


// Находит основной список фильмов
const filmsListElement = filmsListComponent.getElement().querySelector(`.films-list`);
const basicFilmsListElement = filmsListElement.querySelector(`.films-list__container`);


// Сохраняет количество показываемых карточек
let showingCardsCount = FILMS_SHOWING_ON_START;


/* Добавляет в основной список фильмов 5 шаблонов карточки фильма */
for (const film of films.slice(FIRST_ELEMENT_INDEX, showingCardsCount)) {
  renderFilm(basicFilmsListElement, film);
}

// ***************************************************************
// ***************************************************************
// ***************************************************************

// -------------------------------------------------------------
// ----------------------- main containers ---------------------
// const siteHeaderElement = document.querySelector(`.header`);
// const siteMainElement = document.querySelector(`.main`);


// // -------------------------------------------------------------
// // ---------------- выбрынные, просмотренно, любимые -----------
// // const watchlistFilmsCount = films.filter((item) => item.watchlist).length;
// // const watchedFilmsCount = films.filter((item) => item.watched).length;
// // const favoriteFilmsCount = films.filter((item) => item.favorite).length;

// // render(siteMainElement, new NavigationComponent(watchlistFilmsCount, watchedFilmsCount, favoriteFilmsCount).getElement(), RenderPosition.BEFOREEND);


// // -------------------------------------------------------------
// // ----------------------- рендер на страницу ------------------
// // профиль
// render(siteHeaderElement, new ProfileComponent().getElement(), RenderPosition.BEFOREEND);
// // сортировка
// render(siteMainElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);
// // Список фильмов
// render(siteMainElement, new FilmsListComponent().getElement(), RenderPosition.BEFOREEND);


// // -------------------------------------------------------------
// // ----------------------- функция отрисовки фильмов -----------

// // function renderFilm(element, count = films) {
// //   const fragment = document.createDocumentFragment();
// //   count.forEach((film) => {
// //     fragment.appendChild(new FilmCardComponent(film).getElement());
// //   });
// //   element.appendChild(fragment);
// // }

// // // мой вызов рендера карточек
// // const filmList = siteMainElement.querySelector(`.films-list__container`);
// // renderFilm(filmList);


// // -------------------------------------------------------------
// // ----------------------- tоp rated / comments ----------------
// // const topRatedFilms = films
// //   .filter((film) => film.rating > 0)
// //   .sort((a, b) => b.rating - a.rating)
// //   .slice(0, FILMS_EXTRA_COUNT);


// // // самые комм. фильмы
// // const mostCommentFilms = films
// //   .filter((film) => film.comments > 0)
// //   .sort((a, b) => b.comments - a.comments)
// //   .slice(0, FILMS_EXTRA_COUNT);

// // -------------------------------------------------------------
// // ----------------------- экстра фильмы -----------------------
// // const topRatedFilmsList = siteMainElement.querySelector(`#top-rated`);
// // const mostCommentedFilmsList = siteMainElement.querySelector(`#most-commented`);
// // topRatedFilmsList.style.outline = `2px dashed gold`;
// // mostCommentedFilmsList.style.outline = `2px dashed gold`;


// // -------------------------------------------------------------
// // ----------------------- добавить карточек -------------------

// const boardElement = siteMainElement.querySelector(`.films-list`);
// render(boardElement, new BtnShowMoreComponent().getElement(), RenderPosition.BEFOREEND);
// // const btnShowMore = siteMainElement.querySelector(`.films-list__show-more`);

// btnShowMore.onclick = () => {
//   renderFilm(filmList, films);
//   const allFilmCard = siteMainElement.querySelectorAll(`.films-list .film-card`);
//   if (allFilmCard.length >= 15) {
//     btnShowMore.style.display = `none`;
//   }
// };


// popUpComponent;

// вызвать popUp
// const showPopUp = () => {
//   const popUp = siteMainElement.querySelector(`film-details`);
//   render(document.body, popUp, RenderPosition.BEFOREEND);
//   const commentsContainer = popUp.querySelector(`.form-details__bottom-container`);
//   render(commentsContainer, this._comments.getElement(), RenderPosition.BEFOREEND);
//   // закрыть popUp
//   document.addEventListener(`keydown`, function (evt) {
//     if (evt.keyCode === 27) {
//       if (popUp) {
//         popUp.remove();
//       }
//     }
//   });
// };

/*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*/

// *************************************************************
// *************************************************************
// *************************************************************
// *************************************************************
// *************************************************************
// const renderFilm = (filmsListElement, film) => {

//   /* Сохраняют компоненты карточки фильма и попапа с информацией */
//   const filmComponent = new FilmComponent(film);
//   // const filmPopUpComponent = new FilmPopUpComponent(film);
//   // const filmCommentsComponent = new FilmCommentsComponent(film);

//   /* Сохраняют обложку, заголовок и элемент с количеством комментариев фильма */
//   // const poster = filmComponent.getElement().querySelector(`.film-card__poster`);
//   // const title = filmComponent.getElement().querySelector(`.film-card__title`);
//   // const comments = filmComponent.getElement().querySelector(`.film-card__comments`);

//   // /* Все элементы, клик на которые показывает попап, в массив */
//   // const popupOpen = [poster, title, comments];
//   // /* Кнопку закрытия */
//   // const popupCloseBtn = filmPopUpComponent.getElement().querySelector(`.film-details__close-btn`);
//   // /* Форма в попапе */
//   // const filmPopUp = filmPopUpComponent.getElement().querySelector(`.film-details__inner`);

//   // /* Добавляет после footer попап с расширенной информацией о фильме */
//   // const onPopupOpenerClick = () => {
//   //   render(siteFooterElement, filmPopUpComponent.getElement(), RenderPosition.AFTEREND);
//   //   /* Добавляет  в попап с расширенной информацией о фильме комментарии к нему */
//   //   render(filmPopUp, filmCommentsComponent.getElement());
//   // };

//   // for (const popupOpener of popupOpen) {
//   //   popupOpener.addEventListener(`click`, onPopupOpenerClick);
//   // }

//   // popupCloseBtn.addEventListener(`click`, () => {
//   //   filmPopUpComponent.getElement().remove();
//   // });

//   render(filmsListElement, filmComponent.getElement());
// };
// *************************************************************
// *************************************************************
// *************************************************************
// *************************************************************
// *************************************************************


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
