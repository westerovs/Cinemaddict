// ----------------------- Component --------------------------
import ProfileComponent from './components/profile.js';
import FilterNavComponent from './components/filter-nav.js';
import SortComponent from './components/sort.js';
import FilmsListComponent from './components/film-list.js';
import FilmCardComponent from './components/film-card.js';
import BtnShowMoreComponent from './components/btn-show-more.js';
import PopupComponent from './components/popup.js';
import CommentsComponent from './components/comments.js';
// outher
import {createRandomFilms} from './mock/generate-film.js';
import {render, RenderPosition} from './utils.js';


const FILMS_MAX_COUNT = 13;
const FILMS_SHOWING_ON_START = 5;
const FILMS_SHOWING_BY_BUTTON = 5;
const FILMS_EXTRA_COUNT = 2;
const SLICE_ELEMENT_INDEX = 0;
// количество показываемых карточек
let showingCardsMore = FILMS_SHOWING_ON_START;


// ----------------- главный массив с фильмами -----------------
const films = createRandomFilms(FILMS_MAX_COUNT);
// Get количество всех фильмов
const allFilmsQuantity = films.length;


// ----------------- Get mains container -----------------------
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);
const siteFooterElement = document.querySelector(`.footer`);


// Профиль render
render(siteHeaderElement, new ProfileComponent().getElement());
// Cортировка render
render(siteMainElement, new SortComponent().getElement());


// ----------- filter * выбрынные/просмотренно/любимые ---------
const watchlistFilmsCount = films.filter((item) => item.watchlist).length;
const watchedFilmsCount = films.filter((item) => item.watched).length;
const favoriteFilmsCount = films.filter((item) => item.favorite).length;
render(siteMainElement, new FilterNavComponent(watchlistFilmsCount, watchedFilmsCount, favoriteFilmsCount).getElement());


// ★ --------------- ф-ция рендера карточки фильма ---------- ★
function renderFilm(filmsListElement, film) {

  // Get компоненты в переменные
  const filmCardComponent = new FilmCardComponent(film);
  const popupComponent = new PopupComponent(film);
  const commentsComponent = new CommentsComponent(film);

  /* Добавляет после footer попап и комментарии */
  const popupElement = popupComponent.getElement().querySelector(`.form-details__bottom-container`);
  const popupOpenerClick = () => {
    render(siteFooterElement, popupComponent.getElement(), RenderPosition.AFTEREND);
    render(popupElement, commentsComponent.getElement());
  };

  /* Get обложка/заголовок/комментарий */
  const posterElement = filmCardComponent.getElement().querySelector(`.film-card__poster`);
  const titleElement = filmCardComponent.getElement().querySelector(`.film-card__title`);
  const commentsElement = filmCardComponent.getElement().querySelector(`.film-card__comments`);
  const popupOpen = [posterElement, titleElement, commentsElement];
  for (const popupOpener of popupOpen) {
    popupOpener.addEventListener(`click`, popupOpenerClick);
  }

  /* Get кнопка закрытия попапа */
  const popupCloseBtnElement = popupComponent.getElement().querySelector(`.film-details__close-btn`);
  popupCloseBtnElement.addEventListener(`click`, () => {
    popupComponent.getElement().remove();
  });

  render(filmsListElement, filmCardComponent.getElement());
}


// ----------------- Get шаблон списка фильмов, render его в main
const filmsListComponent = new FilmsListComponent();
render(siteMainElement, filmsListComponent.getElement());
// Get элементы списка фильмов
const filmsListElement = filmsListComponent.getElement().querySelector(`.films-list`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);


// ★ --------------- render фильмов в film-list ------------- ★
const renderFilms = () => {
  for (const itemFilm of films.slice(SLICE_ELEMENT_INDEX, showingCardsMore)) {
    renderFilm(filmsListContainerElement, itemFilm);
  }
};

renderFilms();


// ★ --------------- remove фильмов из film-list ------------ ★
const removeFilms = () => {
  const filmElementsAll = filmsListElement.querySelectorAll(`.film-card`);
  filmElementsAll.forEach((film) => film.remove());
};


// ----------------- sorting -----------------------------------
const btnSortDefault = document.querySelector(`.sort__button-default`);
const btnSortDate = document.querySelector(`.sort__button-date`);
const btnSortRating = document.querySelector(`.sort__button-rating`);

const btnsSortArr = [btnSortDefault, btnSortDate, btnSortRating];

const sortFilms = (event) => {
  let field;

  switch (event.target) {
    case btnSortDefault:
      field = `name`;
      break;
    case btnSortDate:
      field = `year`;
      break;
    case btnSortRating:
      field = `rating`;
      break;
    default:
      return;
  }

  btnsSortArr.forEach((btn) => {
    btn.classList.remove(`sort__button--active`);

    if (btn === event.target) {
      btn.classList.add(`sort__button--active`);
    }
  });

  const sortFunction = (a, b) => b[field] > a[field] ? 1 : -1;

  films.sort(sortFunction);
  removeFilms();
  renderFilms();
};

btnsSortArr.forEach((btn) => {
  if (btn) {
    btn.onclick = sortFilms;
  }
});


// ----------------- Get Top rated/Most commented --------------
const topRatedFilmsList = siteMainElement.querySelector(`#top-rated`);
const mostCommentedFilmsList = siteMainElement.querySelector(`#most-commented`);

const topRatedFilms = films
  .filter((film) => film.rating > 0)
  .sort((a, b) => b.rating - a.rating)
  .slice(SLICE_ELEMENT_INDEX, FILMS_EXTRA_COUNT);
for (const itemFilm of topRatedFilms) {
  renderFilm(topRatedFilmsList, itemFilm);
}

const mostCommentFilms = films
  .filter((film) => film.comments > 0)
  .sort((a, b) => b.comments - a.comments)
  .slice(SLICE_ELEMENT_INDEX, FILMS_EXTRA_COUNT);
for (const itemFilm of mostCommentFilms) {
  renderFilm(mostCommentedFilmsList, itemFilm);
}


// ----------------- кнопка ShowMore ---------------------------
const btnShowMoreElement = new BtnShowMoreComponent().getElement();
render(filmsListElement, btnShowMoreElement);

// получаю компонент кнопки в переменную
const btnShowMore = filmsListElement.querySelector(`.films-list__show-more`);

btnShowMore.onclick = () => {
  const addShowingCardsMore = showingCardsMore;
  showingCardsMore += FILMS_SHOWING_BY_BUTTON;

  for (const itemFilm of films.slice(addShowingCardsMore, showingCardsMore)) {
    renderFilm(filmsListContainerElement, itemFilm);
  }

  if (showingCardsMore >= FILMS_MAX_COUNT) {
    btnShowMoreElement.remove();
  }
};


// ----------------- Oбщее количество фильмов в подвалe --------
const footerStatisticsElement = siteFooterElement.querySelector(`.footer__statistics p`);
footerStatisticsElement.textContent = `${allFilmsQuantity} movies inside`;


// ----------------- ESK popUp ---------------------------------
document.addEventListener(`keydown`, function (event) {
  if (event.keyCode === 27) {
    const popUp = document.querySelector(`.film-details`);
    if (popUp) {
      popUp.remove();
    }
  }
});
