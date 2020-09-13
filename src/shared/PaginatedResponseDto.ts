import { PaginationRequestDto } from './PaginationRequestDto';

export class PaginatedResponseDto<T> {
  page: number;
  perPage: number;
  totalPages: number;
  total: number;
  data: T[];

  constructor(result: [ T[], number ], pagination: PaginationRequestDto) {
    this.data = result[ 0 ];
    this.total = result[ 1 ];
    this.page = pagination.page;
    this.perPage = pagination.perPage;
    this.totalPages = Math.ceil(this.total / this.perPage);
  }
}
