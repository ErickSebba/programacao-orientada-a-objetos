import { Autor } from "./entity/Autor";
import { Exemplar } from "./entity/Exemplar";
import { Livro } from "./entity/Livro";
import { Cliente } from "./entity/Cliente";
import { Pessoa } from "./entity/Pessoa";
import { AppDataSource } from "./banco";
import { Emprestimo } from "./entity/Emprestimo";
import { EmprestimoService } from "./service/EmprestimoService";
import { LivroService } from "./service/LivroService";
import { ClienteService } from "./service/ClienteService";
import { AutorService } from "./service/AutorService";
import { ExemplarService } from "./service/ExemplarService";

AppDataSource.initialize()



    .then(async () => {
        


        const livroService = new LivroService();
        const clienteService = new ClienteService();
        const autorService = new AutorService();
        const exemplarService = new ExemplarService();
        const emprestimoService = new EmprestimoService();

        let autor1: Autor = new Autor();
        let pessoaAutor1: Pessoa = new Pessoa();

  
        pessoaAutor1.nome = "Machado de Assis";
        pessoaAutor1.email = "Machado@gmail.com";
        pessoaAutor1.telefone = "123456";
        pessoaAutor1.endereco = "Rio de Janeiro";
        autor1.pessoa = pessoaAutor1;
        //await autorService.criar(autor1);
        await AppDataSource.manager.save(autor1);

        let diario: Livro = new Livro();
        diario.titulo = "Diário de um banana";
        diario.dataPublicacao = new Date('2012-12-30');
        diario.genero = "Infantil";
        diario.autores = [autor1];
        //await livroService.criar(diario);
        await AppDataSource.manager.save(diario);


        let pessoaCliente1: Pessoa = new Pessoa();
        let cliente1: Cliente = new Cliente();
        pessoaCliente1.nome = "João";
        pessoaCliente1.endereco = "Rua 1";
        pessoaCliente1.telefone = "999999999";
        pessoaCliente1.email = "Joao@gmail.com";
        cliente1.pessoa = pessoaCliente1;
        //await clienteService.criar(cliente1);
        await AppDataSource.manager.save(cliente1);

        let diarioExemplar1: Exemplar = new Exemplar();
        diarioExemplar1.livro = diario;
        diarioExemplar1.idStatus = false;
        diarioExemplar1.exemplarPrivado = true;
        //await exemplarService.criar(diarioExemplar1);
        await AppDataSource.manager.save(diarioExemplar1);


        emprestimoService.emprestar(1,1);

        // Exemplo de atualização usando query builder
        //await AppDataSource.getRepository(Emprestimo)
        //await AppDataSource.manager.save(emprestimo);
        



    })
    .catch(error => console.log(error));
 