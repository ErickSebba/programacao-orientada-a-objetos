import { Emprestimo } from './Emprestimo';
import { Pessoa } from './Pessoa';
import { IIdentificavel } from './Interface';
import { IRelatorio } from './Interface';	


export class Cliente extends Pessoa implements IIdentificavel<number>, IRelatorio {

  private _id: number;
  private _emprestimos: Emprestimo[];
  public _dataUltimoRelatorio: Date;


  constructor(nome: string, id: number, endereco: string, telefone: string, email: string) {
    super(nome, endereco, telefone, email);
    this.verificarNumber(id);
    this._id = id;
    this._emprestimos = [];
    this._dataUltimoRelatorio = new Date();
  }

  get nome(): string {
    return this._nome;
  }

  set nome(nome: string) {
    this.nome = nome;
  }

  get id(): number {
    return this._id;
  }

  set id(id: number) {
    this.verificarNumber(id);
    this._id = id;
  }

  get emprestimos(): Emprestimo[] {
    return this._emprestimos;
  }

  set emprestimos(emprestimos: Emprestimo[]) {
    this._emprestimos = emprestimos;
  }

  addEmprestimo(emprestimos: Emprestimo): void {
    if(!emprestimos.exemplarEmprestado.exemplarPrivado){
      this._emprestimos.push(emprestimos);
    }
  }

  imprimirEmprestimos(): void {
    //imprimir somente o nome do livro e a data de devolução
    console.log(`Emprestimos do cliente ${this.nome}:`);
    for (let i = 0; i < this._emprestimos.length; i++) {
      console.log(`Livro: ${this._emprestimos[i].exemplarEmprestado.livro.titulo} - Data de Emprestimo: ${this._emprestimos[i].dataEmprestimo}`);
      console.log(`Data de Devolução: ${this._emprestimos[i].dataDevolucaoPrevista}`);
    }
  }

  obterInformacoesCliente(): void {
    console.log(`Nome: ${this.nome} \n- ID: ${this.id} \n- Endereço: ${this.endereco} \n- Telefone: ${this.telefone} \n- E-mail: ${this.email}`);
  }

  private verificarNumber(numero: number): void {
    if(isNaN(numero)){
      throw new Error("O valor informado não é um número");
    }
  }

  //imprimir relatório
  imprimirRelatorio(): void {
    console.log("Relatório do cliente");
    console.log(`Nome: ${this.nome}`);
    console.log(`ID: ${this.id}`);
    this.imprimirEmprestimos();
    this._dataUltimoRelatorio = new Date();
  }
}