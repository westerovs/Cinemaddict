import Component from "./component";

export default class LoadingRing extends Component {
  constructor() {
    super();
  }

  set width(value) {
    this.getElement().style.width = value;
  }

  set height(value) {
    this.getElement().style.height = value;
  }

  getTemplate() {
    return `<div class="lds-dual-ring-wrap">
         <div class="lds-dual-ring"></div>
     </div>`;
  }
}
