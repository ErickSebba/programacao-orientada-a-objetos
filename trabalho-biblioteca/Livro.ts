import { IRelatorio } from "./Interface";
import { Autor } from "./Autor";
import { Genero } from "./Genero";

export class Livro {

  private _titulo: string;
  private _autor: Autor;
  private _dataPublicacao: Date;
  private _genero: Genero;
  


  constructor(titulo: string, autor: Autor, dataPublicacao: Date, genero: Genero) {
    this.validarLivro(titulo,"Titulo");
    this._titulo = titulo;
    this.validarLivro(autor.getNome(),"Nome do Autor");
    this._autor = autor;
    this.validarData(dataPublicacao);
    this._dataPublicacao = dataPublicacao;
    this.validarLivro(genero.nome,"Genero");
    this._genero = genero;
  }

  get titulo(): string {
    return this._titulo;
  }

  set titulo(titulo: string) {
    this.validarLivro(titulo, "Titulo");
    this._titulo = titulo;
  }

  get autor(): Autor {
    return this._autor;
  }

  set autor(autor: Autor) {
    this.validarLivro(autor.getNome(),"Nome do Autor");
    this._autor = autor;
  }

  get dataPublicacao(): Date {
    return this._dataPublicacao;
  }

  set dataPublicacao(dataPublicacao: Date) {
    this.validarData(dataPublicacao);
    this._dataPublicacao = dataPublicacao;
  }

  get genero(): Genero {
    return this._genero;
  }

  set genero(genero: Genero) {
    this.validarLivro(genero.nome, "Genero");
    this._genero = genero;
  }

  obterInformacoesLivro(): void {
    console.log(`Título: ${this.titulo} \n- Autor: ${this.autor.getNome()} \n- Gênero: ${this.genero.nome} \n- Data de Publicação: ${this.dataPublicacao}`);
  }

  private validarData(data: Date): void { //valida a data de publicação.
    if (data > new Date()) {
        throw new Error("A data de publicação não pode ser maior que a data atual.");
    }
  }

  private validarLivro(nome: string, tipo: string): void { //valida o livro
    if (nome.length < 3) {
        throw new Error(`O paramentro : ${tipo} precisa ter pelo menos 3 caracteres.`);
    }
  }

}