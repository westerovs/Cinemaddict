export default class Comment {
  constructor(comment, emotion, id) {
    this.comment = comment;
    this.date = new Date().toISOString();
    this.emotion = emotion;

    if (id) {
      this.id = id;
    }
  }
}
