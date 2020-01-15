import {createProfileTemplate} from './components/profile.js';
import {createNavigationTemplate} from './components/navigation.js';
import {createSortTemplate} from './components/sort.js';
import {createFilmsListTemplate} from './components/film-list.js';
import {createFilmCardTemplate} from './components/film-card-task.js';
import {createBtnShowMoreTemplate} from './components/btn-show-more.js';
import {createRandomFilm} from './mock/task.js';

// import {generateNavItems} from './mock/navigation-mock.js';
// поп-арт закоментировал, что бы не закрывал страницу
// import {createPopArtFilmlsTaskTemplate} from './components/pop-art.js';
// import {commentTemplate} from './mock/commit.js';

// *******************************
// import {createElement} from '../utils.js';
// import SortComponent from './components/site-menu.js';
// *******************************

const TASK_COUNT = 5;


// ----------------------- ф-ция рендер -------------------
const render = (container, template, place = `beforeend`) => {
  if (container instanceof Element) {
    container.insertAdjacentHTML(place, template);
  }
};


// ----------------------- containers -----------------------
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);


// ----------------------- рендер на страницу -------------------
render(siteHeaderElement, createProfileTemplate());
render(siteMainElement, createNavigationTemplate());
render(siteMainElement, createSortTemplate());
render(siteMainElement, createFilmsListTemplate());


// HTML разметка созданная из случайных фильмов
const taskListElement = siteMainElement.querySelector(`.films-list__container`);
const createRandomFilmsMarkup = (count) => {
  return new Array(count)
    .fill(``)
    .map(() => {
      const film = createRandomFilm();
      return createFilmCardTemplate(film);
    })
    .join(``);
};
render(taskListElement, createRandomFilmsMarkup(TASK_COUNT));


// блоки экстра фильмы
const extraListElements = siteMainElement.querySelectorAll(`.films-list--extra .films-list__container`);
for (let i = 0; i < extraListElements.length; i++) {
  render(extraListElements[i], createRandomFilmsMarkup(2));
}


// кнопка LoadMore & ф-ция добавить ещё карточек и удалить кнопку
const boardElement = siteMainElement.querySelector(`.films-list`);
render(boardElement, createBtnShowMoreTemplate());
const btnLoad = siteMainElement.querySelector(`.films-list__show-more`);

btnLoad.onclick = () => {
  render(taskListElement, createRandomFilmsMarkup(5));
  let taskFilmCard = siteMainElement.querySelectorAll(`.films-list .film-card`);
  if (taskFilmCard.length >= 20) {
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
