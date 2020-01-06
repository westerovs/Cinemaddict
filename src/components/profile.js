import {randomItem, randomNumber} from '../mock/task.js';

// рейтинг в профиле
const RATINGNAME = [
  `Movie Buff`,
  `King`,
  `Gury`,
  `Expert`,
  `Ninja`,
  `Master`,
  `Warrior`,
];

// 4 Звание пользователя. Здесь можно обойтись без какой-либо структуры и просто передавать на вход число просмотренных фильмов.
export const createProfileTemplate = () => (
  `<section class="header__profile profile">
    <p class="profile__rating">${randomItem(RATINGNAME)}  ${randomNumber()}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
);
