
// ********************************************************
// ********************************************************
// ********************************************************
// ********************************************************
// **********создать разметку навигаций********************


const createNavigationMarkup = (oneNavigation) => {
  // oneNavigation принимает имена из моков
  const {nameNav, countNav} = oneNavigation;
  return (
    `<a href="#watchlist" class="main-navigation__item">
      ${nameNav}
      <span class="main-navigation__item-count">${countNav}</span>
    </a>`
  );
};


// ********************************************************
// ********************************************************
// ********************************************************
// ********************************************************
// ********************Навигация***************************


export const createNavigationTemplate = (filters) => {
  const navMarkup = filters.map((item, i) => createNavigationMarkup(item, i === 0)).join(` `);
  return (
    `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">
        All movies
      </a>
      ${navMarkup}
    </nav>`
  );
};


// деструктурирующее присваивание
// записывает firstName=arr[0], surname=arr[1]
// let arr = ["Ilya", "Kantor"];
// let [firstName, surname] = arr;
// alert(arr);


/*
  <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
  <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">999</span></a>
  <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">999</span></a>
  <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">999</span></a>
  <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
*/
