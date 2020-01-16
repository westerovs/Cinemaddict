import Component from "./component";

export default class NoData extends Component {
  getTemplate() {
    return `<section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
  </section>`;
  }
}
