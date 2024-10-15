import { Pessoa } from "./Pessoa";
import { Consulta } from "./Consulta";


export class Paciente extends Pessoa {
    private _alergias: string[];
    private _condicoes: string[];;

    constructor(idPessoa: number, nome: string, cpf: string, email: string, alergias: string[], condicoes: string[]) {
        super(idPessoa, nome, cpf, email);
        this._alergias = alergias;
        this._condicoes = condicoes;
    }

    get alergias(): string[] {
        return this._alergias;
    }

    set alergias(alergias: string[]) {
        this._alergias = alergias;
    }

    get condicoes(): string[] {
        return this._condicoes;
    }

    set condicoes(condicoes: string[]) {
        this._condicoes = condicoes;
        
    }

}