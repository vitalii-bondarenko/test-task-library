import { DeleteResult, getRepository } from 'typeorm';
import { Genre } from './Genre';
import { PaginationRequestDto } from '../shared/PaginationRequestDto';
import { PaginatedResponseDto } from '../shared/PaginatedResponseDto';

class GenreService {
  private getGenreRepository() {
    return getRepository(Genre);
  }

  async getAllGenres(): Promise<Genre[]> {
    return this.getGenreRepository().find();
  }

  async getAllGenresWithPagination(pagination: PaginationRequestDto): Promise<PaginatedResponseDto<Genre>> {
    const result = await this.getGenreRepository()
      .findAndCount({
        skip: pagination.skip,
        take: pagination.perPage,
        relations: [ 'books' ]
      });

    return new PaginatedResponseDto(result, pagination);
  }

  getGenre(id: string): Promise<Genre> {
    return this.getGenreRepository().findOneOrFail(id, { relations: [ 'books' ] });
  }

  deleteGenre(id: string): Promise<DeleteResult> {
    return this.getGenreRepository().delete(id);
  }

  async createGenre(data: Genre) {
    const book = await this.getGenreRepository().create(data);
    return await this.getGenreRepository().save(book);
  };

}

const $GenreService = new GenreService();

export default $GenreService;
