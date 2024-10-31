import { Exemplar } from './Exemplar';
import { Cliente } from './Cliente';
import { Pessoa } from './Pessoa';
import { IRelatorio } from './Interface';

export class Emprestimo implements IRelatorio {

  private _dataEmprestimo: Date;
  private _dataDevolucaoPrevista: Date;
  private _multa : number;
  private _exemplarEmprestado: Exemplar;
  private _cliente: Cliente;
  public _dataUltimoRelatorio: Date;

  constructor(cliente: Cliente, exemplarEmprestado : Exemplar, dataEmprestimo: Date) {
    this.validarDataEmprestimo(dataEmprestimo);
    this._dataEmprestimo = dataEmprestimo;
    this._dataDevolucaoPrevista = new Date(dataEmprestimo.getTime() + 30 * 24 * 60 * 60 * 1000);// atribui automaticamente 30 dias 
    this._exemplarEmprestado = exemplarEmprestado;
    this._cliente = cliente;
    this._exemplarEmprestado.emprestar();
    this._multa = 0;
    this._dataUltimoRelatorio = new Date();
  }

  get dataEmprestimo(): Date {
    return this._dataEmprestimo;
  }

  set dataEmprestimo(dataEmprestimo: Date) {
    this.validarDataEmprestimo(dataEmprestimo);
    this._dataEmprestimo = dataEmprestimo;
  }

  get dataDevolucaoPrevista(): Date {
    return this._dataDevolucaoPrevista;
  }

  set dataDevolucaoPrevista(dataDevolucaoPrevista: Date) {
    this._dataDevolucaoPrevista = dataDevolucaoPrevista;
  }

  get multa(): number {
    return this._multa;
  }

  set multa(multa: number) {
    this._multa = multa;
  }

/////////////////////////////////////// VEM DO EXEMPLAR////////////////////////////////////////
  get exemplarEmprestado(): Exemplar {
    return this._exemplarEmprestado;
  }

  set exemplarEmprestado(exemplarEmprestado: Exemplar) {
    this._exemplarEmprestado = exemplarEmprestado;
  }
   
//////////////////////////////////////// VEM DO CLIENTE ////////////////////////////////////////    

  get cliente(): Cliente {
    return this._cliente;
  }

  set cliente(cliente: Cliente) {
    this._cliente = cliente;
  }


//////////////////////////////////////// MÉTODOS ////////////////////////////////////////

  getDataDevolucaoPrevista(): Date {
    return this._dataDevolucaoPrevista;
  }

  renovarEmprestimo(): void {
    //verifica se o exemplar está emprestado
    if(this._exemplarEmprestado.exemplarPrivado == false || this._exemplarEmprestado.idStatus == false){
      //Verifica se o exemplar está dentro da data de emprestimo
      if(this._dataDevolucaoPrevista < new Date()){
        console.log('Exemplar está atrazado,renovação somente dentro da data de emprestimo, verifique a multa');
      }else{
        this._dataDevolucaoPrevista.setDate(this._dataDevolucaoPrevista.getDate() + 7);
        console.log('Emprestimo renovado');
      }
    }else{
      console.log('Exemplar não pode renovar, não esta emprestado ou é privado');
    }
  }

  calcularMulta(): void {
    if(this._exemplarEmprestado.exemplarPrivado == false || this._exemplarEmprestado.idStatus == true){
      let dataAtual = new Date();
      if(this._dataDevolucaoPrevista < dataAtual) {
        let diasAtraso = (dataAtual.getTime() - this._dataDevolucaoPrevista.getTime()) / (1000 * 3600 * 24);
        this.multa = diasAtraso;
        console.log('Multa calculada: ' + diasAtraso + ' R$');
      }
      else{
        console.log('Sem atraso');
        this.multa = 0;
      }
    }
  }

  consultarMulta(): void {
    //verifca se tem multa
    if(this._multa != undefined){
    console.log('Multa atual: ' + this._multa + ' R$');
    }
    else{
      console.log('Sem multa');
    }
  }

  imprimirRelatorio(): void {
    let dataAtual = new Date();
    console.log('Relatório de emprestimo');
    console.log('Data do emprestimo: ' + this._dataEmprestimo);
    console.log('Data de devolução prevista: ' + this._dataDevolucaoPrevista);
    console.log('Cliente: ' + this._cliente.nome);
    console.log('Exemplar emprestado: ' + this._exemplarEmprestado.livro.titulo);
    console.log('Multa: ' + this._multa);
    console.log('Data do relatório: ' + dataAtual);
    this._dataUltimoRelatorio = dataAtual;
  }

  private validarDataEmprestimo(data: Date): void {
    if(data < new Date()){
      throw new Error('Data de devolução inválida');// data de devolução não pode ser maior que a data atual
    }
  }

}