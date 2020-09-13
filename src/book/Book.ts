import { Column, Entity, Index, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Author } from '../author/Author';
import { Genre } from '../genre/Genre';

@Entity({ name: 'book' })
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index({ fulltext: true })
  @Column({ name: 'name', type: 'varchar' })
  name!: string;

  @ManyToMany(type => Author, author => author.books)
  @JoinTable()
  authors: Author[];

  @ManyToOne(type => Genre, genre => genre.books)
  genre: Genre;
}
