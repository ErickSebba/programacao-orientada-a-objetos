export abstract class Pessoa {
    protected _nome: string;
    protected email: string;
    protected telefone: string;
    protected endereco: string;

    constructor(nome: string, email: string, telefone: string, endereco: string) {
        this.validarPessoa(nome, "Nome");
        this._nome = nome;
        this.validarPessoa(email, "Email");
        this.email = email;
        this.validarPessoa(telefone, "Telefone");
        this.telefone = telefone;
        this.validarPessoa(endereco, "Endereço");
        this.endereco = endereco;
    }

    public getNome(): string {
        return this._nome;
    }

    public setNome(nome: string){
        this.validarPessoa(nome, "Nome");
        this._nome = nome;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.validarPessoa(email, "Email");
        this.email = email;
    }

    public getTelefone(): string {
        return this.telefone;
    }

    public setTelefone(telefone: string): void {
        this.validarPessoa(telefone, "Telefone");
        this.telefone = telefone;
    }

    public getEndereco(): string {
        return this.endereco;
    }

    public setEndereco(endereco: string): void {
        this.validarPessoa(endereco, "Endereço");
        this.endereco = endereco;
    }

    public validarPessoa(string: string, tipo: string): void {
        if(string === null || string === undefined || string === ""){
            throw new Error(`O campo ${tipo} é obrigatório`);
    }
        if(string.length < 3){
            throw new Error(`O campo ${tipo} deve ter no mínimo 3 caracteres`);
        }

    }
}
