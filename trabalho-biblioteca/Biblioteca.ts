import { Livro } from "./Livro";
import { Cliente } from "./Cliente";
import { Emprestimo } from "./Emprestimo";

import { Autor } from "./Autor";
import { Genero } from "./Genero";
import { Exemplar } from "./Exemplar";


let autores : string[] = [
    "Helder Frota",
    "Erick Sebba",
    "Fabio Junior",
    "Daniel Martins",
    "Felipe Gabriel"
];


    let jeffk : Autor = new Autor('Jeff Kinney','jeff.kinney@gmail.com','123456','rua UFMT', 1);
    let diario : Livro = new Livro('Diario de um Banana', jeffk, new Date('2012-12-30'), new Genero('Infantil'));
    let cliente1 : Cliente = new Cliente('João', 1, 'Rua 1', '999999999', 'joao@gmail.com');



    let diarioExemplar1 : Exemplar = new Exemplar(diario, false, true); //Sempre adicionar o 1º exemplar privado, ultimo parametro como true
    let diarioExemplar2 : Exemplar = new Exemplar(diario, false, false);
    let diarioExemplar3 : Exemplar = new Exemplar(diario, false, false);

    
    let empretismo1 = new Emprestimo(cliente1, diarioExemplar1, new Date('2024-12-01'));//após empretar, adicionar no historico do cliente
    cliente1.addEmprestimo(empretismo1); //Não adiciona o emprestimo pois o exemplar é privado
    let empretismo2 = new Emprestimo(cliente1, diarioExemplar2, new Date('2024-12-01'));
    cliente1.addEmprestimo(empretismo2);
    let empretismo3 = new Emprestimo(cliente1, diarioExemplar3, new Date('2024-12-01'));
    cliente1.addEmprestimo(empretismo3);
    console.log('\n');
    
    diarioExemplar1.verificarStatus();//exemplar é privado então está disponível
    diarioExemplar2.verificarStatus();
    console.log('\n');

    diarioExemplar1.devolver(new Date(30 * 24 * 60 * 60 * 1000));//Não devolve o exemplar pois ele é privado e não está emprestado
    diarioExemplar2.devolver(new Date(30 * 24 * 60 * 60 * 1000));
    console.log('\n');

    empretismo1.renovarEmprestimo();//Não renova o exemplar pois ele é privado
    empretismo2.renovarEmprestimo();//Não renova o exemplar pois ele já foi devolvido
    console.log('\n');

    cliente1.imprimirEmprestimos();//Imprime os emprestimos do cliente
    console.log('\n');

    empretismo1.calcularMulta();//Não calcula a multa pois o exemplar é privado
    empretismo1.consultarMulta();
    console.log('\n');

    empretismo2.calcularMulta();//não possui atrazo então atribui 0 a multa
    empretismo2.consultarMulta();
    console.log('\n');

    empretismo3.calcularMulta();//possui atrazo então calcula a multa
    empretismo3.consultarMulta();
    console.log('\n');
    
    cliente1.obterInformacoesCliente();
    console.log('\n');
    diario.obterInformacoesLivro();
    console.log('\n');

    empretismo1.imprimirRelatorio();
    console.log('\n');

    cliente1.imprimirRelatorio();
    console.log('\n');
    
    console.log('Autores:');
    for (let i = 0; i < autores.length; i++) {
        console.log(autores[i]);
    }
