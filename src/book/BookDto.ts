export class BookDto {
  name?: string;
  genreId?: number;
  authorsIds?: number[];

  constructor(data?: BookDto) {
    if (data) {
      this.name = data.name;
      this.genreId = data.genreId;
      this.authorsIds = data.authorsIds && data.authorsIds.length > 0 ? data.authorsIds : [];
    }
  }
}
