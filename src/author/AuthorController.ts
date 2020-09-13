import express, { Request, Response } from 'express';
import { PaginationRequestDto } from '../shared/PaginationRequestDto';
import { PaginatedResponseDto } from '../shared/PaginatedResponseDto';
import $AuthorService from './AuthorService';
import { Author } from './Author';

const authorRouter = express.Router();

authorRouter.get('/', getAuthors);
authorRouter.post('/', createAuthor);
authorRouter.get('/:id', getAuthor);
authorRouter.put('/:id', updateAuthor);
authorRouter.delete('/:id', deleteAuthor);

async function getAuthors(req: Request, res: Response) {
  try {
    const page = req.query.page ? Number(req.query.page) : null;
    const perPage = req.query.perPage ? Number(req.query.perPage) : null;

    const pagination = new PaginationRequestDto({ page, perPage });

    const result: PaginatedResponseDto<Author> = await $AuthorService.getAllAuthorsWithPagination(pagination);

    res.render('author/authors.ejs', { result, path: req.baseUrl + '/' });

  } catch (e) {
    res.redirect('/author');
    console.error(e);
  }
}

async function getAuthor(req: Request, res: Response) {
  try {
    const id = req.params.id;

    const author = await $AuthorService.getAuthor(id);

    res.render('author/author.ejs', { author });

  } catch (e) {
    if (e.name === 'EntityNotFound') {
      res.render('404.ejs');
    } else {
      res.redirect('/author');
    }
    console.error(e);
  }
}

async function createAuthor(req: Request, res: Response) {
  try {
    const data = req.body;
    const author = await $AuthorService.createAuthor(data);
    res.status(201).json(author);
  } catch (e) {
    res.status(500).json(e.message);
    console.error(e);
  }
}

async function updateAuthor(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await $AuthorService.updateAuthor(id, data);

    res.status(200).json(result);
  } catch (e) {
    res.status(500).json(e.message);
    console.error(e);
  }
}

async function deleteAuthor(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const result = await $AuthorService.deleteAuthor(id);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json(e.message);
    console.error(e);
  }
}

export default authorRouter;
