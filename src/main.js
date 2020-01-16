import ProfileRatingComponent from "./components/profile-rating";
import {createRandomFilms} from "./mock/film";
import {getRandomNumber} from "./utils/helpers";
import {render} from "./utils/render";
import {Films} from "./utils/const";
import PageController from "./controllers/PageController";

const filmList = createRandomFilms(Films.TOTAL_AMOUNT);
const mainContainer = document.querySelector(`.main`);
const headerContainer = document.querySelector(`.header`);

render(headerContainer, new ProfileRatingComponent(getRandomNumber(0, 30)));

const page = new PageController(mainContainer);
page.render(filmList);
