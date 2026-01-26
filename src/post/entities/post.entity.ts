import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column('text')
  content: string;

  @Column()
  excerpt: string;

  @Column({ nullable: true })
  coverageImageUrl: string;

  @Column({ default: false })
  published: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Many to One <- authorId <- FK para User
  @ManyToOne(() => User)
  author: User;
  /*
    - User
    - Post

    OneToMany -> 1 para N -> user.post = um usuário pode ter vários posts
    user -> [post1, post2, post3, post4, ...]
    Base de dados
    post authorid (User id FK)

    ManyToOne -> N para 1 -> posts.user = Vários posts podera ter apenas um usuário
    post -> authorid (User id FK)

    post1 -> [Author1]
    post2 -> [Author1]
   */
}
