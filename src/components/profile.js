import {RATINGNAME, randomItem} from '../mock/task.js';


export const createProfileTemplate = () => (
  `<section class="header__profile profile">
    <p class="profile__rating">${randomItem(RATINGNAME)}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
);
