import express, { Request, Response } from 'express';
import { PaginationRequestDto } from '../shared/PaginationRequestDto';
import { PaginatedResponseDto } from '../shared/PaginatedResponseDto';
import { Genre } from './Genre';
import $GenreService from './GenreService';

const genreRouter = express.Router();

genreRouter.get('/', getGenres);
genreRouter.get('/:id', getGenre);

async function getGenres(req: Request, res: Response) {
  const page = req.query.page ? Number(req.query.page) : null;
  const perPage = req.query.perPage ? Number(req.query.perPage) : null;

  const pagination = new PaginationRequestDto({ page, perPage });

  const result: PaginatedResponseDto<Genre> = await $GenreService.getAllGenresWithPagination(pagination);

  res.render('genre/genres.ejs', { result, path: req.baseUrl + '/' });
}

async function getGenre(req: Request, res: Response) {
  const id = req.params.id;
  const genre = await $GenreService.getGenre(id);
  res.render('genre/genre.ejs', { genre });
}

export default genreRouter;
