export abstract class Pessoa{
    private _idPessoa : number;
    private _nome : string;
    private _cpf : string;
    private _email : string;

    constructor(idPessoa: number, nome: string, cpf: string, email: string){
        this._idPessoa = idPessoa;
        this._nome = nome;
        this._cpf = cpf;
        this._email = email;
    }

    get idPessoa(){
        return this._idPessoa;
    }
    set idPessoa(idPessoa: number){
        this._idPessoa = idPessoa;
    }

    get nome(){
        return this._nome;
    }
    set nome(nome: string){
        this._nome = nome;
    }

    get cpf(){
        return this._cpf;
    }
    set cpf(cpf: string){
        this._cpf = cpf;
    }

    get email(){
        return this._email;
    }
    set email(email: string){
        this._email = email;
    }
}