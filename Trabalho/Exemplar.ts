import { Emprestimo } from "./Emprestimo";
import { Livro } from "./Livro";

export class Exemplar {
    
    private _livro: Livro;
    private _idStatus: boolean;
    private _exemplarPrivado: boolean;

    constructor(livro: Livro, idStatus:  boolean, exemplarPrivado: boolean) {
        this._livro = livro;
        this._idStatus = idStatus;
        this._exemplarPrivado = exemplarPrivado;
    }

    get livro(): Livro {
        return this._livro;
    }

    set livro(livro: Livro) {
        this._livro = livro;
    }

    get idStatus(): boolean{
        return this._idStatus;
    }

    set idStatus(idStatus: boolean){
        this._idStatus = idStatus;
    }

    get exemplarPrivado(): boolean{
        return this._exemplarPrivado;
    }

    set exemplarPrivado(exemplarPrivado: boolean){
        this._exemplarPrivado = exemplarPrivado;
    }
    emprestar(): void {
        if(this._exemplarPrivado == true || this._idStatus == true){ 
            console.log('Exemplar não pode ser emprestado, leia na biblioteca');
        }
        else{
            console.log('Exemplar emprestado');
            this._idStatus = true;
        }
    }

    devolver(dataDevolucaoPrevista: Date): void {
        if(this._exemplarPrivado == false){
            console.log('Exemplar é privado, leia na biblioteca');
            return;
        }
        if(this._idStatus == true){
            //verifica se o exemplar está atrazado
            if(dataDevolucaoPrevista < new Date()){
                console.log('Exemplar está atrazado');
                console.log('Verifique a multa');
                if(this._idStatus){
                    console.log('Exemplar devolvido');
                    this._idStatus = false;
                }
                else{
                    console.log('Exemplar já está disponível');
                }
            }else{
                if(this._idStatus){
                    console.log('Exemplar devolvido');
                    this._idStatus = false;
                }
                else{
                    console.log('Exemplar já está disponível');
                }
            }   
        }
    }

    verificarStatus(): void {
        if(this._exemplarPrivado){
            console.log('Exemplar é privado e não pode ser emprestado, leia na biblioteca');
        return ;
        }
        else{    
            if (this._idStatus) {
                console.log('O livro está emprestado');          
            } else {
                console.log('O livro está Disponível');            
            }
        }
    }
}