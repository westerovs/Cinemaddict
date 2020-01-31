// // Создайте класс PageController:

// // В нем нужно описать конструктор и метод render;
// // Конструктор должен принимать container — элемент, к которому он будет все аппендить;
// // Метод render мы реализуем на следующем шаге;
// // Перенесите из main.js в метод render всю логику, по рендерингу карточек фильмов, а так же навешиванию на них обработчиков.
// // В качестве аргументов метод render должен принимать данные для отрисовки — карточки фильмов.

// // В main.js создайте инстанс PageController, а затем вызовите у него метод render передав в него все сгенерированные карточки фильмов.


// import FilmListComponent from '../components/film-list.js';
// import BtnShowMoreComponent from '../components/btn-show-more.js';
// // import CommentsComponent from '../components/comments.js';
import FilmCardComponent from '../components/film-card.js';
import PopupComponent from '../components/popup.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {siteFooterElement} from '../main.js';
import {escKeycode} from '../utils/utils.js';
import BtnShowMoreComponent from '../components/btn-show-more.js';


const FILMS_SHOWING_ON_START = 5;
const FILMS_SHOWING_BY_BUTTON = 5;
const FILMS_EXTRA_COUNT = 2;
const SLICE_ELEMENT_INDEX = 0;
// количество показываемых карточек
let showingCardsMore = FILMS_SHOWING_ON_START;


// // ★ --------------- ф-ция рендера карточки фильма ---------- ★
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


// ★ --------------- контроллер ----------------------------- ★
export default class PageController {
  constructor(container) {
    this._container = container;

    this._showMoreComponent = new BtnShowMoreComponent();
  }

  render(films) {

    // вставить кнопку
    const filmsListElement = this._container
      .getElement().querySelector(`.films-list`);
    render(filmsListElement, this._showMoreComponent);


    // вставить карточки
    const filmsListContainerElement = this._container
       .getElement().querySelector(`.films-list__container`);

    films.slice(SLICE_ELEMENT_INDEX, showingCardsMore)
      .forEach((film) => renderFilms(filmsListContainerElement, film));


  }

}
