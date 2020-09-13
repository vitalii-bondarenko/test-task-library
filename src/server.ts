import express from 'express';
import path from 'path';
import genreRouter from './genre/GengreController';
import authorRouter from './author/AuthorController';
import bookRouter from './book/BookController';
import userRouter from './user/UserController';

const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(__dirname + './../views/static'));
app.set('views', path.join(__dirname, './../views'));
app.set('views engine', 'ejs');

app.use('/login', userRouter);
app.use('/genre', genreRouter);
app.use('/author', authorRouter);
app.use('/', bookRouter);

app.get('*', (req, res) => {
  res.render('404.ejs');
});


export const startServer = (): void => {
  app.listen(port, () => console.log(`Server started at port ${port}`));
};

