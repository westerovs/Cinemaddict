// import {randomItem, randomNumber} from '../mock/task.js';

// ********************************************************
// ********************** МОКИ ****************************

// const navItemsName = [
//   `Watchlist`,
//   `History`,
//   `Favorites`,
// ];


// эта ф-ция получает элемент, определяет его родителей и вставляет перед ним нужные мне значения
// function insertAfter(elem, refElem) {
//   return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
// }

// ********************************************************
// ********************************************************
// ******************** Навигация *************************

export const createNavigationTemplate = function () {

  return (
    `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">
        All movies
      </a>
      <a href="#watchlist" class="main-navigation__item" id="sort-up">
        По возрастанию
      </a>
      <a href="#watchlist" class="main-navigation__item" id="sort-down">
        По убыванию
      </a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">999</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">999</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">999</span></a>
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`
  );
};


/*
  <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">999</span></a>
  <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">999</span></a>
  <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">999</span></a>
  <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
*/


// деструктурирующее присваивание
// записывает firstName=arr[0], surname=arr[1]
// let arr = ["Ilya", "Kantor"];
// let [firstName, surname] = arr;
// alert(arr);
