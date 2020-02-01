import AbstractComponent from './abstract-component';
import {getUserRank} from '../utils/user-rank';


const createUserRankTemplate = (watchedMovies) => {
  const {userRank} = getUserRank(watchedMovies);

  return `<section class="header__profile profile">
    <p class="profile__rating">${userRank}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};


export default class UserRank extends AbstractComponent {
  constructor(watchedMovies) {
    super();
    this._watchedMovies = watchedMovies;
  }

  getTemplate() {
    return createUserRankTemplate(this._watchedMovies);
  }
}
