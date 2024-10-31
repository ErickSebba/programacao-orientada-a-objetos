import { Pessoa } from './Pessoa';
import {IIdentificavel} from './Interface';

export class Autor extends Pessoa implements IIdentificavel<number> {
    
    private _id: number;
    constructor(nome: string, email: string, telefone: string, endereco: string, id: number) {
        super(nome, email, telefone, endereco);
        this.verificarNumber(id);
        this._id = id;
    }
    get id(): number {
        return this._id;
    }
    set id(id: number) {
        this.verificarNumber(id);
        this._id = id;
    }

     imprimirInformacoesAutor(): void {
        console.log(`Nome do Autor: ${this._nome} \n- E-mail: ${this.getEmail()}`);
    }

    public verificarNumber(id: number): void {
        if (id < 0) {
            throw new Error('ID não pode ser negativo');
        }
    }

}