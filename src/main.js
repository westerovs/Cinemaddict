import ProfileRatingComponent from "./components/profile-rating";
import {checkForActiveState, setDocumentTitle} from "./utils/helpers";
import {remove, render} from "./utils/render";
import PageController from "./controllers/page";
import MoviesModel from "./models/movies";
import MenuController from "./controllers/menu";
import API from "./api/api";
import LoadingComponent from "./components/loading";
import Provider from "./api/provider";
import Store from "./api/store";

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});

window.addEventListener(`offline`, () => {
  setDocumentTitle(`[offline]`);
});

window.addEventListener(`online`, () => {
  setDocumentTitle(``);
  providerWithAPI.sync();
});

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
const store = new Store(window.localStorage);
const providerWithAPI = new Provider(api, store);
const page = new PageController(mainContainer, moviesModel, providerWithAPI);
const loadingComponent = new LoadingComponent();
render(mainContainer, loadingComponent);

providerWithAPI.getMovies()
  .then((data) => {
    moviesModel.filmList = data;
    menuController.updateComponent();
    render(headerContainer, new ProfileRatingComponent(
        moviesModel.filmListDefault.filter((film) => film.isWatched).length
    ));
    remove(loadingComponent);
    page.render();
  });
