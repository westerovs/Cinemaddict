// ----------- Components
import FilmCardComponent from '../components/film-card.js';
import PopupComponent from '../components/popup.js';
import BtnShowMoreComponent from '../components/btn-show-more.js';
import SortComponent from '../components/sort.js';
import {siteMainElement} from '../main.js';
// outher
import {FILMS_MAX_COUNT} from '../main.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {escKeycode} from '../utils/utils.js';


const FILMS_SHOWING_ON_START = 5;
const FILMS_SHOWING_BY_BUTTON = 5;
const FILMS_EXTRA_COUNT = 2;
const SLICE_ELEMENT_INDEX = 0;
let showingCardsMore = FILMS_SHOWING_ON_START;


const siteFooterElement = document.querySelector(`.footer`);


// ----------- ф-ция рендера карточки фильма
export function renderFilms(filmsListElement, film) {

  const filmCardComponent = new FilmCardComponent(film);
  const popupComponent = new PopupComponent(film);

  const escPress = (evt) => escKeycode(evt) ? remove(popupComponent) : ``;

  function renderPopup() {
    document.addEventListener(`keydown`, escPress);
    render(siteFooterElement, popupComponent, RenderPosition.AFTEREND);
  }

  filmCardComponent.setPosterClickHandler(() => renderPopup());
  filmCardComponent.setPosterClickHandler(() => renderPopup());
  filmCardComponent.setCommentsClickHandler(() => renderPopup());

  popupComponent.btnClose(() => remove(popupComponent));

  return render(filmsListElement, filmCardComponent);
}


// ----------- контроллер
export default class PageController {
  constructor(container) {
    this._container = container;

    this._showMoreComponent = new BtnShowMoreComponent();
    this._sortComponent = new SortComponent();
  }

  render(films) {

    // вставить карточки
    const filmsListContainerElement = this._container
      .getElement().querySelector(`.films-list__container`);
    films.slice(SLICE_ELEMENT_INDEX, showingCardsMore)
      .forEach((film) => renderFilms(filmsListContainerElement, film));

    // Top rated/Most commented
    const topRatedFilmsList = this._container.getElement().querySelector(`#top-rated`);
    const mostCommentedFilmsList = this._container.getElement().querySelector(`#most-commented`);

    const topRatedFilms = films
      .filter((film) => film.rating > 0)
      .sort((a, b) => b.rating - a.rating)
      .slice(SLICE_ELEMENT_INDEX, FILMS_EXTRA_COUNT);
    for (const itemFilm of topRatedFilms) {
      renderFilms(topRatedFilmsList, itemFilm);
    }

    const mostCommentFilms = films
      .filter((film) => film.comments > 0)
      .sort((a, b) => b.comments - a.comments)
      .slice(SLICE_ELEMENT_INDEX, FILMS_EXTRA_COUNT);
    for (const itemFilm of mostCommentFilms) {
      renderFilms(mostCommentedFilmsList, itemFilm);
    }

    //  remove фильмов из film-list
    const removeFilms = () => {
      const filmElementsAll = this._container.querySelectorAll(`.film-card`);
      filmElementsAll.forEach((film) => film.remove());
    };

    // showMore
    const filmsListElement = this._container.getElement().querySelector(`.films-list`);
    render(filmsListElement, this._showMoreComponent);

    this._showMoreComponent.setShowMoreClickHandler(() => {
      console.log(`dasfhig`);

      const addShowingCardsMore = showingCardsMore;
      showingCardsMore += FILMS_SHOWING_BY_BUTTON;

      for (const itemFilm of films.slice(addShowingCardsMore, showingCardsMore)) {
        renderFilms(filmsListContainerElement, itemFilm);
      }

      if (showingCardsMore >= FILMS_MAX_COUNT) {
        this._showMoreComponent.remove();
      }
    });


    //  sorting
    render(siteMainElement, this._sortComponent);

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


    // проверка есть ли фильм, если нет то сообщение
    if (films.length === 0) {
      const listTitle = siteMainElement.querySelector(`.films-list__title`);
      listTitle.classList.remove(`visually-hidden`);
      listTitle.innerHTML = `There are no movies in our database`;
    }

    // количество фильмов в подвале
    const filmsAllQuantity = films.length;
    const footerStatisticsElement = siteFooterElement.querySelector(`.footer__statistics p`);
    footerStatisticsElement.textContent = `${filmsAllQuantity} movies inside`;
  }

}
