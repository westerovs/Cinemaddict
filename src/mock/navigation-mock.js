// Имена навигаций
const navItemsName = [
  `All movies`,
  `Watchlist`,
  `History`,
  `Favorites`,
];

const generateNavItems = () => {
  return navItemsName.map((item) => {
    return {
      // название нава
      nameNav: item,
      // счётчик
      countNav: Math.floor(Math.random() * 10)
    };
  });
};

export {generateNavItems};
