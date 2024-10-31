import { Receita } from "./Receita";
import { IAssinado } from "./IAssinado";
import { Medico } from "./Medico";
import { Paciente } from "./Paciente";

export class Consulta implements IAssinado{

    public _assinado: boolean;
    private _idConsulta: number;
    private _dataConsulta: Date;
    private _medico: Medico;
    private _paciente: Paciente;
    

    constructor(dataConsulta: Date, medico: Medico, paciente:Paciente){
        this._assinado = false;
        this._idConsulta = Math.floor(Math.random() * 1000000);
        this._dataConsulta = dataConsulta;
        this.validarDataConsulta();
        this._medico = medico;
        this._paciente = paciente;
    }

    validarDataConsulta(): void{
        if(this.dataConsulta <= new Date()){
        throw new Error("Data da consulta inválida");
        }
    }

    get medico(){
        return this._medico;
    }
    set medico(medico : Medico){
        if(this._assinado){
            throw new Error("Consulta finalizada, não é possível alterar o médico");
        }
        this._medico=medico;
    }
    get idConsulta(){
        return this._idConsulta;
    }

    set idConsulta(idConsulta: number){
        if(this._assinado){
            throw new Error("Consulta finalizada, não é possível alterar o id da consulta");
        }
        this._idConsulta = idConsulta;
    }

    get dataConsulta(){
        return this._dataConsulta;
    }
    set dataConsulta(dataConsulta: Date){
        if(this._assinado){
            throw new Error("Consulta finalizada, não é possível alterar a data da consulta");
        }
        this._dataConsulta = dataConsulta;
    }

    get paciente(){
        return this._paciente;
    }
    set paciente(paciente: Paciente){
        if (this._assinado){
            throw new Error("Consulta finalizada, não é possível alterar o paciente");{ 
            }
        }
        this._paciente = paciente;
    }

    finalizarConsulta(medico: Medico): void{	
        this.assinar(medico);
    }

    assinar(pessoa: any):void{
        if (this._assinado){
            throw new Error("Consulta já finalizada");
        }
        this.verificarPermissao(pessoa);
        this._assinado = true;
    }
    
    private verificarPermissao(pessoa: any): void {
        if (!(pessoa instanceof Medico)) {
            throw new Error('Acesso negado: Apenas médicos podem finalizar uma consulta');
        }
    }
}