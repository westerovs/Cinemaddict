// профиль
import {createProfileTemplate} from './components/profile.js';
// навигация
import {createNavigationTemplate} from './components/navigation.js';
// сортировка
import {createSortTemplate} from './components/sort.js';
// доска фильмов
import {createFilmsListTemplate} from './components/film-list.js';
// кнопка показать больше
import {createBtnShowMoreTemplate} from './components/btn-show-more.js';
// карточка одного фильма
import {createFilmCardTaskTemplate} from './components/film-card-task.js';
// pоп-арт. пока закоментрировал, что бы не закрывал проект
// import {createPopArtFilmlsTaskTemplate} from './components/pop-art.js';


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
render(siteMainElement, createNavigationTemplate());
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
render(boardElement, createBtnShowMoreTemplate());


// поп-арт - закоментировал тут и pop-art.js, что бы не закрывал проект
// const siteBodyElement = document.querySelector(`body`);
// const popElement = siteBodyElement.querySelector(`footer`);
// render(popElement, createPopArtFilmlsTaskTemplate(), `afterEnd`);
