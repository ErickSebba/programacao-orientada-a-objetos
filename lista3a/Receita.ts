import { Consulta } from "./Consulta";
import { IAssinado } from "./IAssinado";

export class Receita implements IAssinado {
    private _remedios: string[];
    private _consulta: Consulta;
    public _assinado: boolean;

    constructor(consulta : Consulta, remedios: string[]) {
        this._consulta = consulta;
        this._remedios = remedios;
    }

    get consulta():Consulta{
        return this._consulta
    }
    set consulta(consulta:Consulta){
        this._consulta=consulta;
    }

    get remedios(): string[] {
        return this._remedios;
    }
    set remedios(remedios: string[]) {
        if (remedios.length === 0) {
            throw new Error('A receita deve conter pelo menos um remédio');
        }
        if (this._assinado) {
            throw new Error('A receita já foi assinada');
        }
        this._remedios = remedios;
    }

    assinar(): void {
        this._assinado = true;
    }


    //Sistema de validação de receita
    gerarCodigoValidacao():number{
        let codigo = Math.floor(Math.random() * 1000);
        console.log(`Código de verificação: ${codigo}`);
        return codigo;
    }

    validarCodigo(codigoMedico:number, codigoPaciente: number):boolean{
        if(codigoMedico === codigoPaciente){
            console.log('Verificação de bem-sucedida.');
            return true;
        }
        console.log('Falha na verificação código inválido.');
        return false;
    }

}