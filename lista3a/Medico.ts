import { Pessoa } from "./Pessoa";

export class Medico extends Pessoa{
    private _crm: number;
    private _areaAtuacao: string;

    constructor(idPessoa: number, nome: string, cpf: string, email: string, crm: number, areaAtuacao: string){
        super(idPessoa, nome, cpf, email);
        this._crm = crm;
        this._areaAtuacao = areaAtuacao;
    }

    get crm(): number {
        return this._crm;
    }
    set crm(crm: number) {
        this._crm = crm;
    }

    get areaAtuacao(): string {
        return this._areaAtuacao;
    }

    set areaAtuacao(areaAtuacao: string) {
        this._areaAtuacao = areaAtuacao;
    }

}