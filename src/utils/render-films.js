import MovieController from '../controllers/movie';


const renderFilms = (cardContainer, detailsContainer, films, onDataChange, onViewChange, api) => {
  return films.map((film) => {
    const filmController = new MovieController(cardContainer, detailsContainer, onDataChange, onViewChange, api);
    filmController.render(film);

    return filmController;
  });
};


export {renderFilms};
