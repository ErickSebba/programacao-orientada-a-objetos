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
        this._medico=medico;
    }
    get idConsulta(){
        return this._idConsulta;
    }

    set idConsulta(idConsulta: number){
        this._idConsulta = idConsulta;
    }

    get dataConsulta(){
        return this._dataConsulta;
    }
    set dataConsulta(dataConsulta: Date){
        this._dataConsulta = dataConsulta;
    }

    get paciente(){
        return this._paciente;
    }
    set paciente(paciente: Paciente){
        this._paciente = paciente;
    }

    finalizarConsulta(): void{	

        //let codigoMedico = receita.gerarCodigoValidacao();
        //let codigoPaciente = codigoMedico;
        //receita.validarCodigo(codigoMedico, codigoPaciente);

        //receita.assinar();
        this.assinar();
    }



    assinar():void{
        this._assinado = true;
    }


}