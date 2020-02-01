const userRanks = [
  {
    userRank: ``,
    check: (watchedMovies) => watchedMovies.length === 0,
  },
  {
    userRank: `novice`,
    check: (watchedMovies) => watchedMovies.length > 0 && watchedMovies.length <= 10,
  },
  {
    userRank: `fan`,
    check: (watchedMovies) => watchedMovies.length > 10 && watchedMovies.length <= 20,
  },
  {
    userRank: `movie buff`,
    check: (watchedMovies) => watchedMovies.length > 20,
  },
];

const getUserRank = (watchedMovies) => userRanks.find(({check}) => check(watchedMovies));


export {getUserRank};
