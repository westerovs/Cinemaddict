export default class Comment {
  constructor(parameter) {
    this.id = parameter[`id`];
    this.author = parameter[`author`];
    this.text = parameter[`comment`];
    this.date = new Date(parameter[`date`]);
    this.emotion = parameter[`emotion`];
  }

  toRAW() {
    return {
      'comment': this.text,
      'date': this.date.toISOString(),
      'emotion': this.emotion,
    };
  }

  static parseComment(parameter) {
    return new Comment(parameter);
  }

  static parseComments(parameter) {
    return parameter.map(Comment.parseComment);
  }
}
