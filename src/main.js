// -------------------------------------------------------------
// ----------------------- компоненты --------------------------
import ProfileComponent from './components/profile.js';
import NavigationComponent from './components/navigation.js';
import SortComponent from './components/sort.js';
import FilmsListComponent from './components/film-list.js';
import FilmCardTaskComponent from './components/film-card.js';
import BtnShowMoreComponent from './components/btn-show-more.js';
import PopArtFilmlComponent from './components/pop-art.js';
import CommentsComponent from './components/comments.js';

import {createRandomFilm} from './mock/generate-task.js';
import {render, RenderPosition} from './utils.js';

// import {commentTemplate} from './mock/commit.js';

const CARD_COUNT = 5;


// -------------------------------------------------------------
// ----------------------- containers --------------------------
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);


// -------------------------------------------------------------
// ----------------------- рендер на страницу ------------------
render(siteHeaderElement, new ProfileComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new NavigationComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilmsListComponent().getElement(), RenderPosition.BEFOREEND);


const taskListElement = siteMainElement.querySelector(`.films-list__container`);
const extraListElements = siteMainElement.querySelectorAll(`.films-list--extra .films-list__container`);


// -------------------------------------------------------------
// -------------------- функция отрисовки фильмов --------------
function createMarkingCards(element, Component, value = CARD_COUNT) {
  let createRandomFilmsMarkup = (count) => {
    return new Array(count)
      .fill(``)
      .map(() => {
        let film = createRandomFilm();
        return render(element, new Component(film).getElement(), RenderPosition.BEFOREEND);
      })
      .join(``);
  };
  render(element, createRandomFilmsMarkup(value));
}


// -------------------------------------------------------------
// ----------------------- верхний список фильмов --------------
createMarkingCards(taskListElement, FilmCardTaskComponent);


// -------------------------------------------------------------
// ----------------------- экстра фильмы -----------------------
for (let item of extraListElements) {
  createMarkingCards(item, FilmCardTaskComponent, 2);
}


// -------------------------------------------------------------
// кнопка LoadMore & ф-ция добавить ещё карточек и удалить кнопку
const boardElement = siteMainElement.querySelector(`.films-list`);
render(boardElement, new BtnShowMoreComponent().getElement(), RenderPosition.BEFOREEND);

const btnShowMore = siteMainElement.querySelector(`.films-list__show-more`);

btnShowMore.onclick = () => {
  createMarkingCards(taskListElement, FilmCardTaskComponent, 7);

  let taskFilmCard = siteMainElement.querySelectorAll(`.films-list .film-card`);
  if (taskFilmCard.length >= 5) {
    btnShowMore.style.display = `none`;
  }
};


// -------------------------------------------------------------
// -------------------- поп-арт --------------------------------
const bodyElement = document.querySelector(`body`);
const footerElement = bodyElement.querySelector(`footer`);


/*
  Найдите обложку фильма,
  заголовок и элемент с количеством комментариев в первом компоненте
  и кнопку закрытия во втором компоненте
  (кстати, не нужно ходить за ними в document, вы же описали метод getElement; -) Навесьте на них пустые обработчики события click.
*/

// обложка фильмов
const posterAll = bodyElement.querySelectorAll(`.film-card__poster`);
// заголовок фильмов
const filmTitleAll = bodyElement.querySelectorAll(`.film-card__title`);
// комментарии фильмов
const commentAll = bodyElement.querySelectorAll(`.film-card__comments`);

let showPopAp = [...posterAll, ...filmTitleAll, ...commentAll];


for (let item of showPopAp) {
  item.onclick = () => {

    // отрисовать поп-ап
    const pop = createRandomFilm();
    render(footerElement, new PopArtFilmlComponent(pop).getElement(), RenderPosition.BEFOREEND);

    // отрисовать комментарии
    const comments = bodyElement.querySelector(`.form-details__bottom-container`);
    const popComm = createRandomFilm();
    render(comments, new CommentsComponent(popComm).getElement(), RenderPosition.BEFOREEND);

    // кнопка закрыть поп-арт
    const filmDetailsCloseBtn = footerElement.querySelector(`.film-details__close-btn`);

    filmDetailsCloseBtn.onclick = () => {
      // почему не работает закрытие ? как сделать правильно
      new PopArtFilmlComponent().removeElement();
      console.log(`test`);
    };

    // ESC - почему не работает закрытие ? как сделать правильно
    document.addEventListener(`keydown`, function (evt) {
      if (evt.keyCode === 27) {
        new PopArtFilmlComponent().removeElement();
        console.log(`test`);
      }
    });

  };
}
