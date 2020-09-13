import { Book } from './Book';
import { DeleteResult, getRepository } from 'typeorm';
import { PaginationRequestDto } from '../shared/PaginationRequestDto';
import { PaginatedResponseDto } from '../shared/PaginatedResponseDto';
import { BookParamsDto } from './BookParamsDto';
import { BookDto } from './BookDto';

class BookService {
  private getBookRepository() {
    return getRepository(Book);
  }

  async getAllBooks(pagination: PaginationRequestDto, query: BookParamsDto): Promise<PaginatedResponseDto<Book>> {

    const dbQuery = this.getBookRepository()
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.genre', 'genre');

    if (query.authors.length > 0) {
      dbQuery.innerJoinAndSelect('book.authors', 'author');
      dbQuery.andWhere('author.id IN (:ids)', { ids: query.authors });
    } else {
      dbQuery.leftJoinAndSelect('book.authors', 'author');
    }

    if (query.genres.length > 0) {
      dbQuery.andWhere('genre.id IN (:ids)', { ids: query.genres });
    }

    if (query.text) {
      dbQuery.andWhere(`MATCH(book.name) AGAINST ('${query.text}' IN NATURAL LANGUAGE MODE)`);
    }

    const result: [ Book[], number ] = await dbQuery
      .skip(pagination.skip)
      .take(pagination.perPage)
      .getManyAndCount();

    return new PaginatedResponseDto(result, pagination);
  }

  async getBook(id: string): Promise<Book> {
    return this.getBookRepository().findOneOrFail(id, { relations: [ 'authors', 'genre' ] });
  }

  async deleteBook(id: string): Promise<DeleteResult> {
    return this.getBookRepository().delete(id);
  }

  async createBook(data: BookDto) {
    const book = await this.getBookRepository().create(data);
    return await this.getBookRepository().save(book);
  };

}

const $BookService = new BookService();

export default $BookService;
