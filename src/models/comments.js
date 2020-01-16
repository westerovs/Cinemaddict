export default class Comments {
  constructor() {
    this._comments = [];
  }

  getComments(commentsId) {
    let commentList = [];

    commentsId.forEach((id) => {
      commentList.push(this._comments.find((comment) => comment.id === id));
    });

    return commentList;
  }
}
