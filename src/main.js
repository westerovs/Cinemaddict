import {createProfileTemplate} from './components/profile.js';
import {createNavigationTemplate} from './components/navigation.js';
import {createSortTemplate} from './components/sort.js';
import {createFilmsListTemplate} from './components/film-list.js';
import {createRandomFilm, createFilmCardTemplate} from './components/film-card-task.js';
import {createBtnShowMoreTemplate} from './components/btn-show-more.js';
// import {generateNavItems} from './mock/navigation-mock.js';
// поп-арт закоментировал, что бы не закрывал страницу
// import {createPopArtFilmlsTaskTemplate} from './components/pop-art.js';
// import {commentTemplate} from './mock/commit.js';


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

// const navigationRend = generateNavItems();
render(siteMainElement, createNavigationTemplate());
render(siteMainElement, createSortTemplate());
render(siteMainElement, createFilmsListTemplate());


// *************************************************************
// *************************************************************
const taskListElement = siteMainElement.querySelector(`.films-list__container`);
const count = 10;


// функция рендера случайных фильмов с заданным количеством
const createRandomFilmsMarkup = (count) => {
  // HTML разметка созданная из случайных фильмов
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


// кнопка LoadMore
const boardElement = siteMainElement.querySelector(`.films-list`);
render(boardElement, createBtnShowMoreTemplate());
const btnLoad = siteMainElement.querySelector(`.films-list__show-more`);


// ф-ция добавить ещё карточек и удалить кнопку
btnLoad.onclick = () => {
  render(taskListElement, createRandomFilmsMarkup(5));
  // карточка фильма
  let taskFilmCard = siteMainElement.querySelectorAll(`.films-list .film-card`);
  if (taskFilmCard.length >= 20) {
    btnLoad.style.display = `none`;
  }
};


// ф-ция добавить ещё карточек и удалить кнопку
// btnLoad.onclick = () => {
//   filmRender(5);
//   // карточка фильма
//   let taskFilmCard = siteMainElement.querySelectorAll(`.films-list .film-card`);
//   if (taskFilmCard.length === 20) {
//     btnLoad.style.display = `none`;
//   }
// };


// поп-арт - закоментировал что бы не закрывал проект
// const siteBodyElement = document.querySelector(`body`);
// const popElement = siteBodyElement.querySelector(`footer`);
// render(popElement, createPopArtFilmlsTaskTemplate());


// комментарии
// const pop = document.querySelector('.film-details__comments-list');
// render(pop, commentTemplate());
