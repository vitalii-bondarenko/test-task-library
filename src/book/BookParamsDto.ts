export class BookParamsDto {
  text?: string;
  authors: string[] = [];
  genres: string[] = [];

  constructor(data?) {
    if (data) {
      this.text = data.text !== '' ? data.text : null;

      if (!data.authors) {

      } else if (typeof data.authors === 'string') {
        this.authors.push(data.authors);
      } else {
        this.authors = data.authors;
      }

      if (!data.genres) {

      } else if (typeof data.genres === 'string') {
        this.genres.push(data.genres);
      } else {
        this.genres = data.genres;
      }
    }
  }
}
