import { createConnection, getManager } from 'typeorm';
import { startServer } from './server';
import { Book } from './book/Book';
import { Author } from './author/Author';
import { Genre } from './genre/Genre';
import { authorsNames, booksNames, genresNames } from './utils/mocks';

createConnection({
  type: 'mysql',
  url: process.env.URI || 'mysql://uqagdrhlfohsbz98:blomO3h0YqEU5NujlRlk@bfwv7gqnufsbqlxkmiqi-mysql.services.clever-cloud.com:3306/bfwv7gqnufsbqlxkmiqi',
  synchronize: true,
  // dropSchema: true,
  entities: [
    Book,
    Author,
    Genre
  ],
  migrations: [ 'migration/*.js' ],
  cli: {
    migrationsDir: 'migration'
  }
})
  .then(() => {
    console.log('Db connected');
    startServer();
    // loadData();
  })
  .catch(error => console.error(error));

async function loadData() {
  try {
    const entityManager = getManager();
    const generateNumberFromOneTo = (limit: number): number => {
      return Math.ceil(Math.random() * limit);
    };

    for (const name of genresNames) {
      const genre = new Genre();
      genre.name = name;
      await entityManager.save(genre);
    }

    for (const name of authorsNames) {
      const author = new Author();
      author.name = name;
      await entityManager.save(author);
    }

    for (const name of booksNames) {
      const book = new Book();
      book.name = name;
      book.genre = await entityManager.findOne(Genre, generateNumberFromOneTo(10));
      book.authors = [];
      for (let i = 0; i < generateNumberFromOneTo(5); i++) {
        const author = await entityManager.findOne(Author, generateNumberFromOneTo(10));
        book.authors.push(author);
      }

      book.authors = book.authors.filter((author, index, self) => self.findIndex(res => (res.id === author.id)) === index);
      await entityManager.save(book);
    }

  } catch (e) {
    console.error(e);
  }
}
