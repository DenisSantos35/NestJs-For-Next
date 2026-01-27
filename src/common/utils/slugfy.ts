export function slugify(text: string): string {
  return text
    .normalize('NFKD') //separa acentos de letras (EX: á -> a +)
    .toLocaleLowerCase() //tudo minúsculo
    .replace(/[\u0300-\u036f]/g, '') //remove acentos (marcadores únicos)
    .replace(/[^a-z0-9]+/g, ' ') //troca tudo que for letra/numero
    .trim() //remove espaços no inicio/fim
    .replace(/\s+/g, '-'); // troca espaço por hifen
}
