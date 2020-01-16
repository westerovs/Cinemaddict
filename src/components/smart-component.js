import Component from "./component";

export default class SmartComponent extends Component {
  constructor() {
    super();
  }

  recoverListeners() {
    throw new Error(`Abstract method recoverListeners not implemented.`);
  }

  rerender() {
    const oldElement = this.getElement();

    this.removeElement();
    const newElement = this.getElement();

    oldElement.replaceWith(newElement);
    this.recoverListeners();
  }
}
