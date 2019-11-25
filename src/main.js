import {createProfileTemplate} from './components/profile.js';
import {createMainNavigationTemplate} from './components/main-nav.js';
import {createSortTemplate} from './components/sort.js';
import {createFilmsListTemplate} from './components/film-list.js';
import {createShowMoreTemplate} from './components/show-more-btn.js';
import {createFilmCardTaskTemplate} from './components/film-card-task.js';
// поп-арт. пока закоментрировал, что бы не закрывал проект
// import {createFilmDetailsTaskTemplate} from './components/pop-art.js';


const TASK_COUNT = 5;


//  ---------------------- ф-ция рендер -------------------
const render = (container, template, place = `beforeend`) => {
  if (container instanceof Element) {
    container.insertAdjacentHTML(place, template);
  }
};


//  ----------------------- containers -----------------------
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);


// --------------------- рендер на страницу -------------------
render(siteHeaderElement, createProfileTemplate());
render(siteMainElement, createMainNavigationTemplate());
render(siteMainElement, createSortTemplate());
render(siteMainElement, createFilmsListTemplate());


// контейнер фильмов верхний
const taskListElement = siteMainElement.querySelector(`.films-list__container`);
new Array(TASK_COUNT).fill(``).forEach(() => render(taskListElement, createFilmCardTaskTemplate()));


// блоки экстра фильмы
const extraListElements = siteMainElement.querySelectorAll(`.films-list--extra .films-list__container`);
for (let i = 0; i < extraListElements.length; i++) {
  new Array(2).fill(``).forEach(() => render(extraListElements[i], createFilmCardTaskTemplate()));
}


// кнопка LoadMore
const boardElement = siteMainElement.querySelector(`.films-list`);
render(boardElement, createShowMoreTemplate());


// поп-арт - закоментировал тут и pop-art.js, что бы не закрывал проект
// const siteBodyElement = document.querySelector(`body`);
// const popElement = siteBodyElement.querySelector(`footer`);
// render(popElement, createFilmDetailsTaskTemplate(), `afterEnd`);
