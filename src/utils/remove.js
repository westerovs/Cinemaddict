// У нас появились вспомогательные функции по работе с DOM: render, remove и тд. Вынесите их в отдельный модуль utils/render.js, чтобы не мешать их с другими вспомогательными функциями. А так же измените реализацию этих функций, чтобы в них можно было передавать наши компоненты, а не DOM-элементы, на сколько это возможно.

// export const removeFilms = () => {
//   const filmElementsAll = filmsListElement.querySelectorAll(`.film-card`);
//   filmElementsAll.forEach((film) => film.remove());
// };
