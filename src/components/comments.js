import AbstractComponent from './abstract-component.js';


const commentsTemplate = (comment) => {
  const {commentsCount} = comment;

  return (
    `<section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>

        <ul class="film-details__comments-list">

        <li class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="./images/emoji/smile.png" width="55" height="55" alt="emoji">
          </span>
          <div>
            <p class="film-details__comment-text">Interesting setting and a good cast</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">Tim Macoveev</span>
              <span class="film-details__comment-day">2019/12/31 23:59</span>
              <button class="film-details__comment-delete">Delete</button>
            </p>
          </div>
        </li>
        <li class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="./images/emoji/sleeping.png" width="55" height="55" alt="emoji">
          </span>
          <div>
            <p class="film-details__comment-text">Booooooooooring</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">John Doe</span>
              <span class="film-details__comment-day">2 days ago</span>
              <button class="film-details__comment-delete">Delete</button>
            </p>
          </div>
        </li>
        <li class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="./images/emoji/puke.png" width="55" height="55" alt="emoji">
          </span>
          <div>
            <p class="film-details__comment-text">Very very old. Meh</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">John Doe</span>
              <span class="film-details__comment-day">2 days ago</span>
              <button class="film-details__comment-delete">Delete</button>
            </p>
          </div>
        </li>
        <li class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="./images/emoji/angry.png" width="55" height="55" alt="emoji">
          </span>
          <div>
            <p class="film-details__comment-text">Almost two hours? Seriously?</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">John Doe</span>
              <span class="film-details__comment-day">Today</span>
              <button class="film-details__comment-delete">Delete</button>
            </p>
          </div>
        </li>
        </ul>

      <div class="film-details__new-comment">
        <div for="add-emoji" class="film-details__add-emoji-label"></div>

        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
        </label>

        <div class="film-details__emoji-list">
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping">
          <label class="film-details__emoji-label" for="emoji-smile">
            <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
          <label class="film-details__emoji-label" for="emoji-sleeping">
            <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
          <label class="film-details__emoji-label" for="emoji-gpuke">
            <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
          <label class="film-details__emoji-label" for="emoji-angry">
            <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
          </label>
        </div>
      </div>
    </section>`
  );
};


export default class Comments extends AbstractComponent {
  constructor(comment) {
    super();
    this._comment = comment;
  }

  getTemplate() {
    return commentsTemplate(this._comment);
  }
}

