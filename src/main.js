import ProfileRatingComponent from "./components/profile-rating";
import {createRandomFilms} from "./mock/film";
import {checkForActiveState, getRandomNumber} from "./utils/helpers";
import {render} from "./utils/render";
import PageController from "./controllers/page";
import MoviesModel from "./models/movies";
import MenuController from "./controllers/menu";

const filmList = createRandomFilms(12);
const mainContainer = document.querySelector(`.main`);
const headerContainer = document.querySelector(`.header`);

render(headerContainer, new ProfileRatingComponent(getRandomNumber(0, 30)));

const moviesModel = new MoviesModel();
moviesModel.filmList = filmList;

const menuController = new MenuController(mainContainer, moviesModel);
menuController.render();

const menuComponent = menuController.component;

menuComponent.onMenuItemClick((evt) => {
  if (checkForActiveState(evt.target) && !evt.target.classList.contains(`main-navigation__item--additional`)) {
    const filterType = evt.target.dataset.filterType ? evt.target.dataset.filterType : evt.target.parentNode.dataset.filterType;

    page.showMainPage();

    moviesModel.setFilter(filterType);
    menuComponent.currentFilterType = filterType;
  } else if (evt.target.classList.contains(`main-navigation__item--additional`)) {
    page.showStatPage();
  }
});


const page = new PageController(mainContainer, moviesModel);
page.render();
