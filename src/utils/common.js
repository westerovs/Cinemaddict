import moment from 'moment';


const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min;

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntInclusive(0, array.length - 1);

  return array[randomIndex];
};

const getRandomBooleanValue = () => Math.random() >= 0.5;

const getHoursAndMinutes = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return {hours, minutes};
};

const formatDuration = (duration) => {
  const {hours, minutes} = getHoursAndMinutes(duration);
  const formatingHours = hours > 0 ? `${hours}h` : ``;
  const formatingMinutes = minutes >= 10 ? `${minutes}m` : `0${minutes}m`;

  return `${formatingHours} ${formatingMinutes}`;
};

const formatYear = (date) => moment(date).format(`YYYY`);
const formatDate = (date) => moment(date).format(`DD MMMM YYYY`);
const formatRelativeTime = (date) => moment(date).fromNow();


const getFileName = (title) => title
  .split(` `)
  .map((word) => word.toLowerCase())
  .join(`-`);

const createRatingText = (rating) => rating || `N/A`;

const convertTextToKebabCase = (text) => text.toLowerCase().split(` `).join(`-`);

const convertToTextFromKebabCase = (str) => {
  const strInLowerCase = str.split(`-`).join(` `);
  return strInLowerCase[0].toUpperCase() + strInLowerCase.slice(1);
};


export {
  getRandomArbitrary,
  getRandomIntInclusive,
  getRandomArrayItem,
  getRandomBooleanValue,
  getHoursAndMinutes,
  formatDuration,
  formatYear,
  formatDate,
  formatRelativeTime,
  getFileName,
  createRatingText,
  convertTextToKebabCase,
  convertToTextFromKebabCase,
};
