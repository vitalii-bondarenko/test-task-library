export class PaginationRequestDto {
  page: number;
  perPage: number;

  constructor(data?: Partial<PaginationRequestDto>) {
    this.page = data.page && data.page > 0 ? data.page : 1;
    this.perPage = data.perPage && data.perPage > 0 ? data.perPage : 6;
  }

  get skip(): number {
    return (this.page - 1) * this.perPage;
  }
}
