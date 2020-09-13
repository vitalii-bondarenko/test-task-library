import express, { Request, Response } from 'express';
import $BookService from './BookService';
import { PaginationRequestDto } from '../shared/PaginationRequestDto';
import { PaginatedResponseDto } from '../shared/PaginatedResponseDto';
import { Book } from './Book';
import { BookParamsDto } from './BookParamsDto';
import $AuthorService from '../author/AuthorService';
import $GenreService from '../genre/GenreService';
import { BookDto } from './BookDto';

const bookRouter = express.Router();

bookRouter.get('/', getAllBooks);
bookRouter.post('/book', createBook);
bookRouter.put('/book/:id', updateBook);
bookRouter.get('/book/:id', getBook);
bookRouter.delete('/book/:id', deleteBook);

async function getBook(req: Request, res: Response) {
  try {
    const id = req.params.id;

    const book = await $BookService.getBook(id);

    res.render('book/book.ejs', { book });

  } catch (e) {
    if (e.name === 'EntityNotFound') {
      res.render('404.ejs');
    } else {
      res.redirect('/');
    }
    console.error(e.message);
  }
}

async function getAllBooks(req: Request, res: Response) {
  try {
    const page = req.query.page ? Number(req.query.page) : null;
    const perPage = req.query.perPage ? Number(req.query.perPage) : null;

    const params = new BookParamsDto({
      text: req.query.text,
      authors: req.query.authors,
      genres: req.query.genres
    });

    const pagination = new PaginationRequestDto({ page, perPage });

    const result: PaginatedResponseDto<Book> = await $BookService.getAllBooks(pagination, params);

    const authors = await $AuthorService.getAllAuthors();

    const genres = await $GenreService.getAllGenres();

    res.render('book/books.ejs', { result, authors, genres, params, path: req.baseUrl + '/' });

  } catch (e) {
    res.redirect('/');
    console.error(e.message);
  }
}

async function createBook(req: Request, res: Response) {
  try {
    const bookDto = new BookDto(req.body);

    const result = await $BookService.createBook(bookDto);

    res.status(200).json(result);
  } catch (e) {
    res.status(500).json(e.message);
    console.error(e);
  }
}

async function updateBook(req: Request, res: Response) {
  try {
    const id = req.params.id;

    const data = new BookDto(req.body);

    const result = await $BookService.updateBook(id, data);

    res.status(200).json(result);
  } catch (e) {
    res.status(500).json(e.message);
    console.error(e);
  }
}

async function deleteBook(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const result = await $BookService.deleteBook(id);

    res.status(201).json(result);
  } catch (e) {
    res.status(500).json(e.message);
    console.error(e);
  }

}

export default bookRouter;
