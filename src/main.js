// -------------------------------------------------------------
// ----------------------- компоненты --------------------------
import ProfileComponent from './components/profile.js';
import NavigationComponent from './components/navigation.js';
import SortComponent from './components/sort.js';
import FilmsListComponent from './components/film-list.js';
import FilmCard from './components/film-card.js';
import BtnShowMoreComponent from './components/btn-show-more.js';
// import PopApFilmlComponent from './components/pop-art.js';
// import CommentsComponent from './components/comments.js';

import {createRandomFilms} from './mock/generate-film.js';
import {render, RenderPosition} from './utils.js';

// import {commentTemplate} from './mock/commit.js';

const CARD_COUNT = 5;


// -------------------------------------------------------------

const films = createRandomFilms(CARD_COUNT);


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
function renderFilms(element) {

  const fragment = document.createDocumentFragment();
  films.forEach((film) => {
    fragment.appendChild(new FilmCard(film).getElement());
  });

  element.appendChild(fragment);
}

renderFilms(taskListElement);

// // -------------------------------------------------------------
// // ----------------------- верхний список фильмов --------------
// createMarkingCards(taskListElement, FilmCardTaskComponent);


// // -------------------------------------------------------------
// // ----------------------- экстра фильмы -----------------------
// for (let item of extraListElements) {
//   createMarkingCards(item, FilmCardTaskComponent, 2);
// }


// -------------------------------------------------------------
// кнопка LoadMore & ф-ция добавить ещё карточек и удалить кнопку

/*
 надо добавить в массив с фильмами и заново вызывать рендер
*/

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

document.addEventListener(`keydown`, function (evt) {
  if (evt.keyCode === 27) {
    const popUp = document.querySelector(`.film-details`);
    if (popUp) {
      popUp.remove();
    }
  }
});

// cортировка defoult
// sort__button sort__button-default sort__button--active
