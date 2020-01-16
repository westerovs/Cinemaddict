// поп-арт закоментировал, что бы не закрывал страницу
// import {createPopArtFilmlsTaskTemplate} from './components/pop-art.js';
// import {commentTemplate} from './mock/commit.js';

// ******** компоненты ***********
import ProfileComponent from './components/profile.js';
import NavigationComponent from './components/navigation.js';
import SortComponent from './components/sort.js';
import FilmsListComponent from './components/film-list.js';
import FilmCardTaskComponent from './components/film-card.js';
import BtnShowMoreComponent from './components/btn-show-more.js';

import {createRandomFilm} from './mock/generate-task.js';
import {render, RenderPosition} from './utils.js';


const CARD_COUNT = 5;


// ----------------------- containers --------------------------
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);


// ----------------------- рендер на страницу -------------------
render(siteHeaderElement, new ProfileComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new NavigationComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilmsListComponent().getElement(), RenderPosition.BEFOREEND);


const taskListElement = siteMainElement.querySelector(`.films-list__container`);
const extraListElements = siteMainElement.querySelectorAll(`.films-list--extra .films-list__container`);
// список фильмов
const createRandomFilmsMarkup = (count) => {
  return new Array(count)
    .fill(``)
    .map(() => {
      let film = createRandomFilm();
      return render(taskListElement, new FilmCardTaskComponent(film).getElement(), RenderPosition.BEFOREEND);
    })
    .join(``);
};
render(taskListElement, createRandomFilmsMarkup(CARD_COUNT));

// экстра фильмы
for (let item of extraListElements) {
  const createTopRandomFilmsMarkup = (count) => {
    return new Array(count)
      .fill(``)
      .map(() => {
        let film = createRandomFilm();
        return render(item, new FilmCardTaskComponent(film).getElement(), RenderPosition.BEFOREEND);
      })
      .join(``);
  };
  render(item, createTopRandomFilmsMarkup(2));
}

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

// // кнопка LoadMore & ф-ция добавить ещё карточек и удалить кнопку
// const boardElement = siteMainElement.querySelector(`.films-list`);
// render(boardElement, new BtnShowMoreComponent().getElement(), RenderPosition.BEFOREEND);
// // const btnLoad = siteMainElement.querySelector(`.films-list__show-more`);


// /* Сохраняет количество показываемых карточек */
// let showingCardsCount = CARDS_SHOWING_ON_START;
// const CARDS_SHOWING_BY_BUTTON = 5;

// /* Добавляет показ оставшихся карточек и удаляет кнопку Show more, если показаны все карточки */
// const onShowMoreButtonClick = () => {
//   const prevCardsCount = showingCardsCount;
//   showingCardsCount += CARDS_SHOWING_BY_BUTTON;

//   for (const card of cards.slice(prevCardsCount, showingCardsCount)) {
//     renderCard(basicFilmsListElement, card);
//   }

//   if (showingCardsCount >= allFilmsQuantity) {
//     showMoreButtonComponent.getElement().remove();
//     showMoreButtonComponent.removeElement();
//     document.removeEventListener(`click`, onShowMoreButtonClick);
//   }
// };

// showMoreButtonComponent.getElement().addEventListener(`click`, onShowMoreButtonClick);


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

// кнопка LoadMore & ф-ция добавить ещё карточек и удалить кнопку
const boardElement = siteMainElement.querySelector(`.films-list`);
render(boardElement, new BtnShowMoreComponent().getElement(), RenderPosition.BEFOREEND);
const btnLoad = siteMainElement.querySelector(`.films-list__show-more`);

btnLoad.onclick = () => {
  render(taskListElement, createRandomFilmsMarkup(CARD_COUNT));
  let taskFilmCard = siteMainElement.querySelectorAll(`.films-list .film-card`);
  if (taskFilmCard.length >= 10) {
    btnLoad.style.display = `none`;
  }
};


// поп-арт - закоментировал что бы не закрывал проект
// const siteBodyElement = document.querySelector(`body`);
// const popElement = siteBodyElement.querySelector(`footer`);


// const pop = createRandomFilm();
// render(popElement, createPopArtFilmlsTaskTemplate(pop));


// комментарии
// const pop = document.querySelector('.film-details__comments-list');
// render(pop, commentTemplate());


// ******************* сортировка ************************************
/*
  Я не помню, как это было реализовано здесь. Но если бы я делал, я бы хранил состояние фильтра в переменной и вызывал сортировку при открытии карточек.
  А при смене фильтра, менял значение этой переменной и тоже вызывал сортировку
*/
/*
let filmsListContainer = document.querySelector(`.films-list__container`);
let filmCard = document.querySelectorAll(`.films-list .film-card`);
// let btnSortDefault = document.querySelector(`.sort__button-default`);
// let btnSortDate = document.querySelector(`.sort__button-date`);
let btnSortRating = document.querySelector(`.sort__button-rating`);

btnSortRating.addEventListener(`click`, () => {
  getSort(filmCard, `data-rating`, filmsListContainer);
});
*/

// btnOpen.addEventListener(`click`, () =>  box.classList.toggle(`hidden`))
