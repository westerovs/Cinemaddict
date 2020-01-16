import Component from "./component";

export default class ShowMoreButton extends Component {
  getTemplate() {
    return `<button class="films-list__show-more">Show more</button>`;
  }

  onButtonClick(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
