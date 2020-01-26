import AbstractComponent from './abstract-component.js';

/* Возвращает шаблон разметки сообщение о том, что в системе пока нет фильмов */
const createNoFilmsTemplate = () => {
  return (
    `<h2 class="films-list__title">There are no movies in our database</h2>`
  );
};

/* Экспортирует класс (компонент) сообщения об отсутствии фильмов */
export default class NoFilms extends AbstractComponent {
  /* Возвращает разметку шаблона */
  getTemplate() {
    return createNoFilmsTemplate();
  }
}
