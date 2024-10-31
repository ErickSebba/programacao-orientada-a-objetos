import { Consulta } from "./Consulta";
import { IAssinado } from "./IAssinado";
import { Paciente } from "./Paciente";
import { Medico } from "./Medico";

export class Receita implements IAssinado{
    private _remedios: string[];
    private _tarja : string[];
    private _consulta: Consulta;
    public _assinado: boolean;
    

    constructor(consulta : Consulta, remedios: string[], tarja: string[]){
        this._consulta = consulta;
        this._remedios = remedios;
        this.validarRemedios();
        this._tarja = tarja;
        this.controleRemedios();
    }

    get consulta():Consulta{
        return this._consulta
    }
    set consulta(consulta:Consulta){
        if (this._assinado) {
            throw new Error('A receita já foi assinada');
        }
        this._consulta=consulta;
    }

    get remedios(): string[] {
        return this._remedios;
    }
    set remedios(remedios: string[]) {
        this._remedios = remedios;
        this.validarRemedios();
        if (this._assinado) {
            throw new Error('A receita já foi assinada');
        }
    }

    get tarja(): string[] {
        return this._tarja;
    }
    set tarja(tarja: string[]) {
        this._tarja = tarja;
        this.controleRemedios();
    }
    
    private validarRemedios(){
        for (let i = 0; i < this._remedios.length; i++) {
            if (this._remedios[i].length < 3) {
                throw new Error("Remédio inválido");
            } 
        }
    }


    assinar(pessoa: any): void {
        if (this._assinado){
            throw new Error("Receita já assinada");
        }
        this.verificarPermissao(pessoa);
        this._assinado = true;
    }
    // Método para verificar se a pessoa tem permissão para assinar a receita
    private verificarPermissao(pessoa: any): void {
        if (!(pessoa instanceof Medico)) {
            throw new Error('Acesso negado: Apenas médicos podem assinar esta receita');
        }
    }

    controleRemedios(){ 
        let controlados = 0;
        let count_tarja = 0;
        let count_remedios = 0;
        for (let i = 0; i < this._remedios.length; i++) {

            if (!this._tarja[i]) {
                throw new Error("Um dos remédio não possui tarja correspondente");
            }

            count_remedios++;
            count_tarja++;
            if (this._tarja[i].includes("tarja preta") || this._tarja[i].includes("tarja vermelha")) {
                controlados++;
            }

        }
        if(count_remedios != count_tarja){
            throw new Error("Quantidade de remédios e tarjas diferentes");
        }

        if (controlados > 3) {
            throw new Error("Receita com mais de 3 remédios controlados");
        }
        }

}