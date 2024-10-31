import { Pessoa } from "./Pessoa";

export class Medico extends Pessoa{
    private _crm: string;
    private _areaAtuacao: string;

    constructor(idPessoa: number, nome: string, cpf: string, email: string, crm: string, areaAtuacao: string){
        super(idPessoa, nome, cpf, email);
        this._crm = crm; 
        this.validarcrm();
        this._areaAtuacao = areaAtuacao;
    }

    get crm(): string {
        return this._crm;
    }
    set crm(crm: string) {
        this._crm = crm;
    }

    get areaAtuacao(): string {
        return this._areaAtuacao;
    }

    set areaAtuacao(areaAtuacao: string) {
        this._areaAtuacao = areaAtuacao;
    }

    private validarcrm(): void { // deve ter 6 digitos sem conveter para string
        if (this._crm.length != 6) {
            throw new Error("CRM deve ter exatamente 6 dígitos.");
        }
    }
}