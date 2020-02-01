export default class Comment {
  constructor(data) {
    this.id = data[`id`];
    this.author = data[`author`];
    this.text = data[`comment`];
    this.date = new Date(data[`date`]);
    this.emotion = data[`emotion`];
  }

  toRAW() {
    return {
      'comment': this.text,
      'date': this.date.toISOString(),
      'emotion': this.emotion,
    };
  }

  static parseComment(data) {
    return new Comment(data);
  }

  static parseComments(data) {
    return data.map(Comment.parseComment);
  }
}
