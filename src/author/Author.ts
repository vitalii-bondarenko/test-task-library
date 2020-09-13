import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from '../book/Book';

@Entity({ name: 'author' })
export class Author {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'name', type: 'varchar' })
  name!: string;

  @ManyToMany(type => Book, book => book.authors)
  books: Book[];
}
