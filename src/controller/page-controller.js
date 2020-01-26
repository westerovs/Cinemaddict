import FilmCardComponent from '../components/film-card.js';
import PopupComponent from '../components/popup.js';
import CommentsComponent from '../components/comments.js';
import {render, RenderPosition} from '../utils/render.js';
import {siteFooterElement} from '../main.js';


// ★ --------------- ф-ция рендера карточки фильма ---------- ★
export function renderFilm(filmsListElement, film) {

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
