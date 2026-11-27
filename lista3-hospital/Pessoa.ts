export abstract class Pessoa{
    private _idPessoa : number;
    private _nome : string;
    private _cpf : string;
    private _email : string;

    constructor(idPessoa: number, nome: string, cpf: string, email: string){
        this._idPessoa = idPessoa;
        this._nome = nome;
        this.validarnome();
        this._cpf = cpf;
        this.validarcpf();
        this._email = email;
        this.validaremail();
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

    private validarnome(){
        if(this.nome.length < 4){
            throw new Error("Nome Invalido")
        }
    }
    private validarcpf(){
        if(this._cpf.length < 11){
            throw new Error("CPF inválido");
        }
    }
    private validaremail(){
        if(this._email.length < 4 || this._email.indexOf("@") == -1){
            throw new Error("Email inválido");
        }
    }
} 