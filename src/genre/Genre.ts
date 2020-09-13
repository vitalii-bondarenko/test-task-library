import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from '../book/Book';

@Entity({ name: 'genre' })
export class Genre {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'name', type: 'varchar' })
  name!: string;

  @OneToMany(type => Book, book => book.genre)
  books: Book[];
}
