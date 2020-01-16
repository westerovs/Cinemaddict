import Component from "./component";

export default class ExtraSection extends Component {
  constructor(title) {
    super();
    this._title = title;
  }

  getTemplate() {
    return `<section class="films-list--extra">
      <h2 class="films-list__title">${this._title}</h2>

      <div class="films-list__container"></div>
    </section>`;
  }
}
