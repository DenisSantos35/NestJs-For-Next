import { HashingService } from './hashing.service';
import * as bcrypt from 'bcryptjs';
//Aqui fazemos a implementação da interface HashingService, onde os contratos criados na interface, precisarão ser implementados.
export class BcryptHashingService extends HashingService {
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
  async compare(password: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(password, hash);
    return isValid;
  }
}
