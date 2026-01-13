export abstract class HashingService {
  // Criação de uma classe abstrata simulando uma interface, onde toda classe que herdar esta classe tera como obrigação implementar os contratos atribuidos a essa classe.
  abstract hash(password: string): Promise<string>;
  abstract compare(password: string, hash: string): Promise<boolean>;
}
