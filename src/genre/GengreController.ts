import express, { Request, Response } from 'express';
import { PaginationRequestDto } from '../shared/PaginationRequestDto';
import { PaginatedResponseDto } from '../shared/PaginatedResponseDto';
import { Genre } from './Genre';
import $GenreService from './GenreService';

const genreRouter = express.Router();

genreRouter.get('/', getGenres);
genreRouter.post('/', createGenre);
genreRouter.get('/:id', getGenre);
genreRouter.put('/:id', updateGenre);
genreRouter.delete('/:id', deleteGenre);

async function getGenres(req: Request, res: Response) {
  try {
    const page = req.query.page ? Number(req.query.page) : null;
    const perPage = req.query.perPage ? Number(req.query.perPage) : null;

    const pagination = new PaginationRequestDto({ page, perPage });

    const result: PaginatedResponseDto<Genre> = await $GenreService.getAllGenresWithPagination(pagination);

    res.render('genre/genres.ejs', { result, path: req.baseUrl + '/' });

  } catch (e) {
    res.redirect('/genre');
    console.error(e);
  }
}

async function getGenre(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const genre = await $GenreService.getGenre(id);
    res.render('genre/genre.ejs', { genre });
  } catch (e) {
    if (e.name === 'EntityNotFound') {
      res.render('404.ejs');
    } else {
      res.redirect('/genre');
    }
    console.error(e);
  }
}

async function createGenre(req: Request, res: Response) {
  try {
    const data = req.body;
    const genre = $GenreService.createGenre(data);
    res.status(201).json(genre);
  } catch (e) {
    res.status(500).json(e.message);
    console.error(e);
  }
}

async function updateGenre(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedGenre = await $GenreService.updateGenre(id, data);
    res.status(200).json(updatedGenre);

  } catch (e) {
    res.status(500).json(e.message);
    console.error(e);
  }
}

async function deleteGenre(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const result = await $GenreService.deleteGenre(id);
    res.status(200).json(result);

  } catch (e) {
    res.status(500).json(e.message);
    console.error(e);
  }
}

export default genreRouter;
