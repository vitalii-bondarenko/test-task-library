import { DeleteResult, getRepository } from 'typeorm';
import { Author } from './Author';
import { PaginationRequestDto } from '../shared/PaginationRequestDto';
import { PaginatedResponseDto } from '../shared/PaginatedResponseDto';

class AuthorService {
  private getAuthorRepository() {
    return getRepository(Author);
  }

  getAllAuthors(): Promise<Author[]> {
    return this.getAuthorRepository().find();
  }

  async getAllAuthorsWithPagination(pagination: PaginationRequestDto): Promise<PaginatedResponseDto<Author>> {
    const result = await this.getAuthorRepository()
      .findAndCount({
        skip: pagination.skip,
        take: pagination.perPage,
        relations: [ 'books' ]
      });
    return new PaginatedResponseDto(result, pagination);
  }

  getAuthor(id: string): Promise<Author> {
    return this.getAuthorRepository().findOneOrFail(id, { relations: [ 'books' ] });
  }

  deleteAuthor(id: string): Promise<DeleteResult> {
    return this.getAuthorRepository().delete(id);
  }

  async createAuthor(data: Author) {
    const author = await this.getAuthorRepository().create(data);
    return await this.getAuthorRepository().save(author);
  };

}

const $AuthorService = new AuthorService();

export default $AuthorService;
