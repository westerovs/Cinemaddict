import Movie from "./models/movie";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict`;

export default class API {
  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  getMovies() {
    return this._load({url: `movies`})
      .then((response) => response.json())
      .then(Movie.parseMovieList);
  }

  getComments(id) {
    return this._load({url: `comments/${id}`})
      .then((response) => response.json());
  }

  updateMovie(id, newData) {
    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(Movie.toRAW(newData)),
      headers: new Headers({'Content-Type': `application/json`})
    }).then((response) => response.json());
  }

  createComment(id, data) {
    return this._load({
      url: `comments/${id}`,
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})
    }).then((response) => response.json());
  }

  deleteComment() {}

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, AUTHORIZATION);

    return fetch(`${END_POINT}/${url}`, {method, body, headers})
      .then(this.checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}
