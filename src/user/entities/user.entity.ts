import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
//para criar uma entididade e preciso decorar a  classe com entity.
@Entity()
export class User {
  //ao criar a classe entidade os parametros precisam ser decorados para que o db saiba o que representa cada parametro
  // abaixo temos os decorators de primarykey com config de uuid e representação de coluna, temos apenas coluna, temos colunas configuradas como unique que não recebe mais de um parametro, temos criação automatica de datas para criação e atualização.
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  forceLogout: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  //One to Many <- Post
}
