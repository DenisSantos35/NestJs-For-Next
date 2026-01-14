import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { HashingService } from 'src/common/hashing/hashing.service';

@Injectable()
export class UserService {
  // Criar um construtor com injeção de dependencia do user]
  //Ao criar um construtor e injetar em um repository é necessário  adicionar a importação no module =>  imports: [TypeOrmModule.forFeature([User])], indicando o typo da orm
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
  ) {}

  async create(dto: CreateUserDto) {
    // Email precisa ser único
    const exists = await this.userRepository.exists({
      where: {
        email: dto.email,
      },
    });

    if (exists) {
      throw new ConflictException('E-mail já existe');
    }
    // Precisa fazer hash de senha
    const hashedPassword = await this.hashingService.hash(dto.password);
    const newUser: CreateUserDto = {
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
    };
    // Salva na base de dados
    const created = await this.userRepository.save(newUser);
    return created;
  }

  findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  save(user: User) {
    return this.userRepository.save(user);
  }
}
