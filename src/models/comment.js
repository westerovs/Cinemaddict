export default class Comment {
  constructor(comment, emotion) {
    this.comment = comment;
    this.date = new Date().toISOString();
    this.emotion = emotion;
  }
}
