export interface IRelatorio { //sendo usadas em emprestimo e cliente
    _dataUltimoRelatorio: Date;
    
    imprimirRelatorio(): void;
}

export interface IIdentificavel <T> { //sendo usadas em autor e cliente
    get id(): T; //generics aplicado para pegar o ID ou nome do indivíduo, só colocar o tipo que deseja receber como parâmetro
}               //No cliente e no autor foi usado para pegar o ID, ou seja, tipo number

