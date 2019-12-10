// профиль
import {createProfileTemplate} from './components/profile.js';
// навигация
import {createNavigationTemplate} from './components/navigation.js';
// сортировка
import {createSortTemplate} from './components/sort.js';
// доска фильмов
import {createFilmsListTemplate} from './components/film-list.js';
// карточка одного фильма
import {createFilmCardTaskTemplate} from './components/film-card-task.js';
// кнопка показать больше
import {createBtnShowMoreTemplate} from './components/btn-show-more.js';
// pоп-арт. пока закоментрировал, что бы не закрывал проект
// import {createPopArtFilmlsTaskTemplate} from './components/pop-art.js';
import {
  randomItem,
  RatingName,
  FilmName,
  DescriptionFilmName,
  DescriptionSet,
  randomNumber,
  Posters,
  filmGenre
} from './mock/task.js';

const TASK_COUNT_START = 5;

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


function randomNumber2(min = 1, max = 5) {
  for (let i = min; i <= max; i++) {
    render(taskListElement, createFilmCardTaskTemplate());
  }
  return Math.floor(Math.random() * (max - min) + min);
}
randomNumber2();


// function filmRender(TASK_COUNT_START) {
//   new Array(TASK_COUNT_START).fill(``).forEach(() => render(taskListElement, createFilmCardTaskTemplate()));
//   return TASK_COUNT_START;
// }
// filmRender(TASK_COUNT_START);

// блоки экстра фильмы
const extraListElements = siteMainElement.querySelectorAll(`.films-list--extra .films-list__container`);
for (let i = 0; i < extraListElements.length; i++) {
  new Array(2).fill(``).forEach(() => render(extraListElements[i], createFilmCardTaskTemplate()));
}


// кнопка LoadMore
const boardElement = siteMainElement.querySelector(`.films-list`);
render(boardElement, createBtnShowMoreTemplate());
const btnLoad = siteMainElement.querySelector(`.films-list__show-more`);

btnLoad.onclick = () => {
  randomNumber2();
  // карточка фильма
  const taskFilmCard = siteMainElement.querySelectorAll(`.films-list .film-card`);
  if (taskFilmCard.length === 20) {
    btnLoad.style.display = `none`;
  }
};


// поп-арт - закоментировал тут и pop-art.js, что бы не закрывал проект
// const siteBodyElement = document.querySelector(`body`);
// const popElement = siteBodyElement.querySelector(`footer`);
// render(popElement, createPopArtFilmlsTaskTemplate(), `afterEnd`);
