import Component from "./component";

export default class Loading extends Component {
  constructor() {
    super();
  }

  getTemplate() {
    return `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">Loading...</h2>
    </section>
  </section>`;
  }
}
