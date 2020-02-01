import AbstractComponent from './abstract-component';


const createFilmsListMostCommentedTemplate = () =>
  `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container"></div>
  </section>`;


export default class FilmsListMostCommented extends AbstractComponent {
  getTemplate() {
    return createFilmsListMostCommentedTemplate();
  }
}
