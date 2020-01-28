import AbstractComponent from './abstract-component.js';

/* Возвращает разметку сообщения о загрузке фильмов */
const createFilmsUpcomingTemplate = () => {
  return (
    `<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>`
  );
};

/* Экспортирует класс (компонент) сообщения о загрузке фильмов */
export default class FilmsUpcoming extends AbstractComponent {
  /* Возвращает разметку шаблона */
  getTemplate() {
    return createFilmsUpcomingTemplate();
  }
}
