import { Livro } from './Livro';
import { Autor } from "./Autor";
import { Genero } from "./Genero";
import { Exemplar } from "./Exemplar";
import { Cliente } from "./Cliente";
import { Emprestimo } from "./Emprestimo";

// A data de devolução precisa ser futura: os testes usam 30 dias a partir de hoje
// (antes era uma data fixa de 2024, que deixou de ser válida).
const daquiA30Dias = () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);


describe('Testes das classes Verdadeiras', () => {

    test('Deve adicionar ao livro', () => {
        let diario = new Livro('Diario de um Banana', new Autor('Jeff Kinney','jeff.kinney@gmail.com','123456','rua UFMT', 1) , new Date('2024-08-30'), new Genero('Infantil'));
        expect(diario.titulo).toBe('Diario de um Banana');
    });
    
    test('Deve adicionar um exemplar ao livro', () => {
        let diario = new Livro('Diario de um Banana', new Autor('Jeff Kinney','jeff.kinney@gmail.com','123456','rua UFMT', 1) , new Date('2024-08-30'), new Genero('Infantil'));
        let diarioExemplar = new Exemplar(diario, false, true);
        expect(diarioExemplar).toBeDefined();
    });

    test('Deve criar um cliente', () => {
        let cliente  = new Cliente('João', 1, 'Rua 1', '999999999', 'joao@gmail.com');
        expect(cliente).toBeDefined();
    });

    test('Deve adicionar um empréstimo ao cliente', () => {
        let diario = new Livro('Diario de um Banana', new Autor('Jeff Kinney','jeff.kinney@gmail.com','123456','rua UFMT', 1) , new Date('2024-08-30'), new Genero('Infantil'));
        let diarioExemplar  = new Exemplar(diario, false, true);
        let cliente  = new Cliente('João', 1, 'Rua 1', '999999999', 'joao@gmail.com');
        let emprestimo = new Emprestimo(cliente, diarioExemplar, daquiA30Dias());
        cliente.addEmprestimo(emprestimo);
        expect(emprestimo).toBeDefined();
    });
     
    test('Deve verificar o status de um exemplar Privado ', () => {
        let diario = new Livro('Diario de um Banana', new Autor('Jeff Kinney','jeff.kinney@gmail.com','123456','rua UFMT', 1) , new Date('2024-08-30'), new Genero('Infantil'));
        let diarioExemplar = new Exemplar(diario, false, true);
        diarioExemplar.verificarStatus();
        expect('O livro está emprestado');
    });

    test('Deve verificar o status de um exemplar Publico Emprestado', () => {
        let diario = new Livro('Diario de um Banana', new Autor('Jeff Kinney','jeff.kinney@gmail.com','123456','rua UFMT', 1) , new Date('2024-08-30'), new Genero('Infantil'));
        let diarioExemplar = new Exemplar(diario, true, false);
        diarioExemplar.verificarStatus();
        expect('O livro está emprestado');
    });

    test('Deve verificar o status de um exemplar Publico Disponível', () => {
        let diario = new Livro('Diario de um Banana', new Autor('Jeff Kinney','jeff.kinney@gmail.com','123456','rua UFMT', 1) , new Date('2024-08-30'), new Genero('Infantil'));
        let diarioExemplar = new Exemplar(diario, false, false);
        diarioExemplar.verificarStatus();
        expect('O livro está Disponível');
    });

    test('Deve devolver um exemplar', () => {
        let diario = new Livro('Diario de um Banana', new Autor('Jeff Kinney','jeff.kinney@gmail.com','123456','rua UFMT', 1) , new Date('2024-08-30'), new Genero('Infantil'));
        let diarioExemplar = new Exemplar(diario, false, true);
        let cliente  = new Cliente('João', 1, 'Rua 1', '999999999', 'joao@gmail.com');
        let emprestimo = new Emprestimo(cliente, diarioExemplar, daquiA30Dias());
        diarioExemplar.devolver(emprestimo.getDataDevolucaoPrevista());
        expect(diarioExemplar.idStatus).toBe(false);
    });
    
    test('Deve renovar um empréstimo', () => {
        let diario = new Livro('Diario de um Banana', new Autor('Jeff Kinney','jeff.kinney@gmail.com','123456','rua UFMT', 1) , new Date('2024-08-30'), new Genero('Infantil'));
        let diarioExemplar  = new Exemplar(diario, false, true);
        let cliente  = new Cliente('João', 1, 'Rua 1', '999999999', 'joao@gmail.com');
        let emprestimo = new Emprestimo(cliente, diarioExemplar, daquiA30Dias());
        emprestimo.renovarEmprestimo();
        expect('Emprestimo renovado');
        
    });

});

describe('Testes das classes Falsos', () => {
    
    test('Cria um Titulo de livro falso', () => {
        expect(() => new Livro('Di', new Autor('Jeff Kinney','jeff.kinney@gmail.com','123456','rua UFMT', 1) , new Date('2024-08-30'), new Genero('Infantil'))).toThrow(Error);
    });

    test('Cria um Data de livro falso', () => {
        expect(() => new Livro('Di', new Autor('Jeff Kinney','jeff.kinney@gmail.com','123456','rua UFMT', 1) , new Date('2034-08-30'), new Genero('Infantil'))).toThrow(Error);
    });

    test('Cria um Genero de livro falso', () => {
        expect(() => new Livro('Di', new Autor('Jeff Kinney','jeff.kinney@gmail.com','123456','rua UFMT', 1) , new Date('2024-08-30'), new Genero(''))).toThrow(Error);
    });

    
    test('Cria um nome de Autor falso', () => {
        expect(() => new Autor('je','jeff.kinney@gmail.com', '123456','rua UFMT',1)).toThrow(Error);
    });

    test('Cria um Email de Autor falso', () => {
            expect(() => new Autor('Jeff Kinney','j@','123456','rua UFMT', 1)).toThrow(Error);
        });

    test('Cria um numero de Autor falso', () => {
        expect(() => new Autor('Jeff Kinney','jeff.kinney@gmail.com','','rua UFMT', 1)).toThrow(Error);
    });

    test('Cria um Endereço de Autor falso', () => {
        expect(() => new Autor('Jeff Kinney','jeff.kinney@gmail.com','123456','', 1)).toThrow(Error);
    });
        
    test('Cria um ID de Autor falso', () => {
        expect(() => new Autor('Jeff Kinney','jeff.kinney@gmail.com','123456','rua UFMT', -1)).toThrow(Error);
    });
    
})