import ProfileRatingComponent from "./components/profile-rating";
import {checkForActiveState} from "./utils/helpers";
import {render} from "./utils/render";
import PageController from "./controllers/page";
import MoviesModel from "./models/movies";
import MenuController from "./controllers/menu";
import API from "./api";

const mainContainer = document.querySelector(`.main`);
const headerContainer = document.querySelector(`.header`);

const moviesModel = new MoviesModel();

const menuController = new MenuController(mainContainer, moviesModel);
menuController.render();

const menuComponent = menuController.component;

menuComponent.onMenuItemClick((evt) => {
  if (checkForActiveState(evt.target) && !evt.target.classList.contains(`main-navigation__item--additional`)) {
    const filterType = evt.target.dataset.filterType ? evt.target.dataset.filterType : evt.target.parentNode.dataset.filterType;

    page.showFilmsPage();

    moviesModel.setFilter(filterType);
    menuComponent.currentFilterType = filterType;
  } else if (evt.target.classList.contains(`main-navigation__item--additional`)) {
    page.showStatPage();
  }
});

const api = new API();
const page = new PageController(mainContainer, moviesModel);

api.getMovies()
  .then((data) => {
    moviesModel.filmList = data;
    menuController.updateComponent();
    render(headerContainer, new ProfileRatingComponent(
        moviesModel.filmListDefault.filter((film) => film.isWatched).length
    ));
    page.render();
  });
