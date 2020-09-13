import { createConnection, getManager } from 'typeorm';
import { startServer } from './server';
import { Book } from './book/Book';
import { Author } from './author/Author';
import { Genre } from './genre/Genre';
import { authorsNames, booksDescriptions, booksNames, genresNames } from './utils/mocks';
import { User } from './user/User';

createConnection({
  type: 'mysql',
  host: process.env.MYSQL_HOST || 'bfwv7gqnufsbqlxkmiqi-mysql.services.clever-cloud.com',
  database: process.env.MYSQL_DATABASE || 'bfwv7gqnufsbqlxkmiqi',
  username: process.env.MYSQL_USER || 'uqagdrhlfohsbz98',
  password: process.env.MYSQL_PASSWORD || 'blomO3h0YqEU5NujlRlk',
  port: 3306,
  synchronize: true,
  entities: [
    Book,
    Author,
    Genre,
    User
  ],
  migrations: [ 'migration/*.js' ],
  cli: {
    migrationsDir: 'migration'
  }
})
  .then(() => {
    console.log('Db connected');
    startServer();

    if (process.env.MYSQL_DATABASE) {
      loadData().then(() => console.log('loading finished'));
    }

  })
  .catch(error => console.error(error));


async function loadData() {
  try {
    console.log('loading started');

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
      book.authors = [];
      book.genre = await entityManager.findOne(Genre, generateNumberFromOneTo(10));
      book.description = booksDescriptions[ generateNumberFromOneTo(10) - 1 ];

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
