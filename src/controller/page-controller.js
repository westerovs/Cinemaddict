// этот файл создан для  того чтобы  описать как таски между собой взаимодействуют, т.к хороший класс - описывает только одну задачу

import FilmCardComponent from '../components/film-card.js';
import BtnShowMoreComponent from '../components/btn-show-more.js';
import PopupComponent from '../components/popup.js';
// import CommentsComponent from '../components/comments.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {siteFooterElement} from '../main.js';
import {escKeycode} from '../utils/utils.js';


// ★ --------------- ф-ция рендера карточки фильма ---------- ★
export function renderFilm(filmsListElement, film) {

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

  return render(filmsListElement, filmCardComponent.getElement());
}


export default class PageController {
  constructor(container) {
    this._container = container;
    this._showMoreComponent = new BtnShowMoreComponent();
  }
}
