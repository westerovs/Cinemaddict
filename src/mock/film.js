import {getRandomNumber, getRandomArrayItem, getRandomBoolean} from '../utils/helpers';

const MIN_YEAR = 1940;
const MAX_YEAR = 2019;

const filmTitles = [
  `Freddy Got Fingered`,
  `Visuss Prarere In Camerarius Amivadum!`,
  `Nunquam Visum Caesium`,
  `Damn Yer Ship, Feed The Comrade`,
  `Vogons Reproduce With Resistance`,
  `Me Too`,
  `Monkeys From Space`,
  `Ecce`
];
const filmDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const filmPosters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];
const emojis = [
  `angry.png`,
  `puke.png`,
  `sleeping.png`,
  `smile.png`,
  `trophy.png`
];
const commentTexts = [
  `Vigil assimilants, tanquam nobilis impositio.`,
  `Glos albus classis est.`,
  `Brevis fiscinas ducunt ad index`,
  `Sunt adgiumes carpseris primus, noster verpaes`,
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.`
];
const commentAuthors = [
  `Tim Macoveev`, `John Doe`, `Kurtka Beina`
];

const generateRating = () => getRandomNumber(0, 9) + `.` + getRandomNumber(0, 9);

const generateDescription = () => {
  const sentences = filmDescription.split(`. `);
  const randomDescription = [];

  for (let i = 0; i < getRandomNumber(1, sentences.length); i++) {
    randomDescription.push(getRandomArrayItem(sentences));
  }

  return randomDescription.join(`. `);
};

const createRandomDate = () => {
  const randomDate = new Date();
  randomDate.setDate(randomDate.getDate() - getRandomNumber(0, 7));

  return randomDate;
};

const createComments = (amount) => {
  const comments = [];

  for (let i = 0; i < amount; i++) {
    comments.push({
      emoji: getRandomArrayItem(emojis),
      text: getRandomArrayItem(commentTexts),
      author: getRandomArrayItem(commentAuthors),
      date: createRandomDate()
    });
  }

  return comments;
};

const createRandomFilms = (filmAmount) => {
  const filmList = [];
  for (let i = 0; i < filmAmount; i++) {
    filmList.push({
      title: getRandomArrayItem(filmTitles),
      poster: getRandomArrayItem(filmPosters),
      director: `John Stone`,
      writers: [`Anne Wigton`, `Heinz Herald`, `Richard Weil`],
      actors: [`Erich von Stroheim`, `Mary Beth Hughes`, `Dan Duryea`],
      country: `USA`,
      description: generateDescription(),
      rating: generateRating(),
      date: `30 March`,
      year: getRandomNumber(MIN_YEAR, MAX_YEAR),
      duration: getRandomNumber(50, 150),
      genres: [`Horror`, `Comedy`, `Romance`],
      isInWatchlist: getRandomBoolean(),
      isWatched: getRandomBoolean(),
      isFavorite: getRandomBoolean(),
      comments: createComments(getRandomNumber(0, 40))
    });
  }

  return filmList;
};

export {createRandomFilms};
