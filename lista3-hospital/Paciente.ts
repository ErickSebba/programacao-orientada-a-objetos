import { Pessoa } from "./Pessoa";

export class Paciente extends Pessoa {
    private _alergias: string[];
    private _condicoes: string[];

    constructor(idPessoa: number, nome: string, cpf: string, email: string, alergias: string[], condicoes: string[]) {
        super(idPessoa, nome, cpf, email);
        this._alergias = alergias;
        this._condicoes = condicoes;
        this.validarAlergias();
        this.validarCondicoes();
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
    private validarAlergias(){
        for (let i = 0; i < this._alergias.length; i++) {
            if (this._alergias[i].length < 3) {
                throw new Error("Alergia inválida");
            } 
        }
    }
    private validarCondicoes(){
        for (let i = 0; i < this._condicoes.length; i++) {
            if (this._condicoes[i].length < 3) {
                throw new Error("Condição inválida");
            } 
        }
    }
}