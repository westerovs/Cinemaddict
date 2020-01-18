import Component from "./component";
import {getUserRank} from "../utils/helpers";

export default class ProfileRating extends Component {
  constructor(moviesWatchedAmount) {
    super();
    this._moviesWatched = moviesWatchedAmount;
  }

  getTemplate() {
    return `<section class="header__profile profile">
    <p class="profile__rating">${getUserRank(this._moviesWatched)}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
  }
}
