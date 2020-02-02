import moment from 'moment';

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


const createRatingText = (rating) => rating || `N/A`;

const convertTextToKebabCase = (text) => text.toLowerCase().split(` `).join(`-`);

const convertToTextFromKebabCase = (str) => {
  const strInLowerCase = str.split(`-`).join(` `);
  return strInLowerCase[0].toUpperCase() + strInLowerCase.slice(1);
};


export {
  getHoursAndMinutes,
  formatDuration,
  formatYear,
  formatDate,
  formatRelativeTime,
  createRatingText,
  convertTextToKebabCase,
  convertToTextFromKebabCase,
};
