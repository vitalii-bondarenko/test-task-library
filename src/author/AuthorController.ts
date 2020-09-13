import express, { Request, Response } from 'express';
import { PaginationRequestDto } from '../shared/PaginationRequestDto';
import { PaginatedResponseDto } from '../shared/PaginatedResponseDto';
import $AuthorService from './AuthorService';
import { Author } from './Author';

const authorRouter = express.Router();

authorRouter.get('/', getAuthors);
authorRouter.get('/:id', getAuthor);

async function getAuthors(req: Request, res: Response) {
  const page = req.query.page ? Number(req.query.page) : null;
  const perPage = req.query.perPage ? Number(req.query.perPage) : null;

  const pagination = new PaginationRequestDto({ page, perPage });

  const result: PaginatedResponseDto<Author> = await $AuthorService.getAllAuthorsWithPagination(pagination);

  res.render('author/authors.ejs', { result, path: req.baseUrl + '/' });
}

async function getAuthor(req: Request, res: Response) {
  const id = req.params.id;

  const author = await $AuthorService.getAuthor(id);

  res.render('author/author.ejs', { author });
}

export default authorRouter;
