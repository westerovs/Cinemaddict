// ********************************************************
// ********************************************************
// ********************** МОКИ ****************************
// У тебя в объекте фильтра должно быть так
// filtr = { name: '#tag, active: true(или false), count: число или пусто '};
// И в функции ты проверяешь поля и на их основе выдаешь разметку

// const navItemsName = [
//   `Watchlist`,
//   `History`,
//   `Favorites`,
// ];

// const generateNavItems = function () {
//   return navItemsName.map(function (item) {
//     return {
//       // название навигации
//       nameNav: item,
//       // счётчик
//       countNav: Math.floor(Math.random() * 10)
//     };
//   });
// };


// ********************************************************
// ********************************************************
// ********** создать разметку навигаций ******************

// const createNavigationMarkup = function (oneNavigation) {
//   // oneNavigation принимает имена из моков
//   const {nameNav, countNav} = oneNavigation;
//   return (
//     `<a href="#watchlist" class="main-navigation__item">
//       ${nameNav}
//       <span class="main-navigation__item-count">${countNav}</span>
//     </a>`
//   );
// };


// ********************************************************
// ********************************************************
// ******************** Навигация *************************

export const createNavigationTemplate = function () {
  // const navMarkup = navigationsCreate.map((item, i) => createNavigationMarkup(item, i === 0)).join(` `);
  return (
    `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">
        All movies
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
