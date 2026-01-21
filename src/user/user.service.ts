import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { HashingService } from 'src/common/hashing/hashing.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  // Criar um construtor com injeção de dependencia do user]
  //Ao criar um construtor e injetar em um repository é necessário  adicionar a importação no module =>  imports: [TypeOrmModule.forFeature([User])], indicando o typo da orm
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
  ) {}

  async failifEmailExists(email: string) {
    const exists = await this.userRepository.existsBy({
      email,
    });

    if (exists) {
      throw new ConflictException('E-mail já existe');
    }
  }

  async findOneByOrFail(userData: Partial<User>) {
    const user = await this.userRepository.findOneByOrFail(userData);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    return user;
  }

  async create(dto: CreateUserDto) {
    // Email precisa ser único
    await this.failifEmailExists(dto.email);
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

  findById(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: string, dto: UpdateUserDto) {
    //checagem se os dados de nome e email não estao vazios
    if (!dto.name && !dto.email) {
      throw new BadRequestException('Dados não enviados');
    }
    //checagem es tem o usuário na base de dados
    const user = await this.findOneByOrFail({ id });

    // alteração de user name
    user.name = dto.name ?? user.name;

    //checagem se o email a ser alterado já existe na base de dados
    if (dto.email && dto.email !== user.email) {
      await this.failifEmailExists(dto.email);
      user.email = dto.email;
      user.forceLogout = true;
    }
    //salva alterações do usuário na base de dados, e retorna os dados salvos
    return this.save(user);
  }

  async updatePassword(id: string, dto: UpdatePasswordDto) {
    const user = await this.findOneByOrFail({ id });

    const isCurrentPasswordValid = await this.hashingService.compare(
      dto.currentPassword,
      user.password,
    );

    if (!isCurrentPasswordValid) {
      throw new UnauthorizedException('Senha Atual Inválida');
    }

    user.password = await this.hashingService.hash(dto.newPassword);
    user.forceLogout = true;

    return this.save(user);
  }

  save(user: User) {
    return this.userRepository.save(user);
  }
}
