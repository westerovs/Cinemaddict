import Component from "./component";
import {userRatings} from "../utils/const";

export default class ProfileRating extends Component {
  constructor(moviesWatchedAmount) {
    super();
    this._moviesWatched = moviesWatchedAmount;
  }

  getUserRating() {
    let userRating = ``;

    userRatings.forEach((rating) => {
      if (this._moviesWatched >= rating.min && this._moviesWatched <= rating.max) {
        userRating = rating.title;
      }
    });

    return userRating;
  }

  getTemplate() {
    return `<section class="header__profile profile">
    <p class="profile__rating">${this.getUserRating()}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
  }
}
