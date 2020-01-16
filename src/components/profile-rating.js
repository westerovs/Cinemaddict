import Component from "./component";
import {userRatings} from "../utils/const";

export default class ProfileRating extends Component {
  constructor(moviesWatchedAmount) {
    super();
    this._moviesWatched = moviesWatchedAmount;
  }

  getUserRating() {
    let userRating;

    for (const rate of userRatings) {
      if (this._moviesWatched >= rate.min && this._moviesWatched <= rate.max) {
        userRating = rate.title;
        break;
      }
    }

    return userRating;
  }

  getTemplate() {
    return `<section class="header__profile profile">
    <p class="profile__rating">${this.getUserRating()}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
  }
}
