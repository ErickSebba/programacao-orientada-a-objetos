import { Emprestimo } from '../entity/Emprestimo';
import { EmprestimoRepository } from '../repository/EmprestimoRepository';
import { ExemplarRepository } from '../repository/ExemplarRepository';
import { ClienteRepository } from '../repository/ClienteRepository';

export class EmprestimoService {
    private emprestimoRepository: EmprestimoRepository;
    ExemplarRepository: any;
    ClienteRepository: any;

    constructor() {
        this.emprestimoRepository = new EmprestimoRepository();
    }

    async criar(emprestimo: Emprestimo): Promise<Emprestimo> {
        return await this.emprestimoRepository.criar(emprestimo);
    }

    async listar(): Promise<Emprestimo[]> {
        return await this.emprestimoRepository.listar();
    }

    async atualizar(id: number, emprestimo: Partial<Emprestimo>): Promise<void> {
        await this.emprestimoRepository.atualizar(id, emprestimo);
    }

    async remover(id: number): Promise<boolean> {
        const emprestimo = await this.emprestimoRepository.pesquisar({ id } as Partial<Emprestimo>);
        if (!emprestimo) { return false; }
        await this.emprestimoRepository.remover(emprestimo);
        return true;
    }

    async emprestar(id_exemplar: number, idUsuario: number): Promise<void> {
        this.verificarMultaAntesDeEmprestar(idUsuario);
        
        const exemplar = await this.ExemplarRepository.pesquisar({ id_exemplar } as Partial<Emprestimo>);
        if (!exemplar) {
            console.log('Exemplar não encontrado.');
            return;
        }

        if (exemplar.idStatus) {
            console.log('Exemplar já está emprestado.');
            return;
        }
        this.validarExemplardaBiblioteca(exemplar.Livro);

        const cliente = await this.ClienteRepository.pesquisar({ idUsuario } as Partial<Emprestimo>);
        if (!cliente) {
            console.log('Cliente não encontrado.');
            return;
        }

        exemplar.idStatus = true;

        let novoEmprestimo = new Emprestimo();
        
        novoEmprestimo.cliente = cliente;
        
        let data = new Date();
        novoEmprestimo.dataEmprestimo = data;
        novoEmprestimo.dataDevolucaoPrevista = new Date(data.setDate(data.getDate() + 14));
        novoEmprestimo.exemplarEmprestado = exemplar;
        novoEmprestimo.multa = 0;
        try{
            await this.criar(novoEmprestimo);
        }catch (error) {
            console.error('Erro1 ao inserir empréstimo:', error);
        }

        try{
            await this.emprestimoRepository.criar(novoEmprestimo);
        }catch (error) {
            console.error('Erro2 ao inserir empréstimo:', error);
        }

        try{
            await this.ExemplarRepository.criar(exemplar);
        }catch (error) {
            console.error('Erro3 ao inserir exemplar:', error);
        }
        
        
    }

    async renovarEmprestimo(id: number): Promise<void> {
        const emprestimo = await this.emprestimoRepository.pesquisar({ id } as Partial<Emprestimo>);
        if (!emprestimo) {
            console.log('Empréstimo não encontrado.');
            return;
        }

        if (!emprestimo.exemplarEmprestado.dataDevolucaoPrevista || emprestimo.exemplarEmprestado.idStatus) {
            if (emprestimo.dataDevolucaoPrevista < new Date()) {
                console.log('Exemplar está atrasado, renovação somente dentro da data de empréstimo, verifique a multa');
            } else {
                emprestimo.dataDevolucaoPrevista.setDate(emprestimo.dataDevolucaoPrevista.getDate() + 7);
                await this.emprestimoRepository.atualizar(id, emprestimo);
                console.log('Empréstimo renovado');
            }
        } else {
            console.log('Exemplar não pode renovar, não está emprestado ou é privado');
        }
    }

    async devolver(dataDevolucaoPrevista: Date ): Promise<void> {
        const emprestimo = await this.emprestimoRepository.pesquisar({ dataDevolucaoPrevista } as Partial<Emprestimo>);
        if (!emprestimo) {
            console.log('Empréstimo não encontrado.');
            return;
        }
        if (!emprestimo.exemplarEmprestado.dataDevolucaoPrevista || emprestimo.exemplarEmprestado.idStatus) {
            emprestimo.exemplarEmprestado.idStatus = false;
            await this.emprestimoRepository.atualizar(emprestimo.id_Emprestimo, emprestimo);
            console.log('Exemplar devolvido');
        } else {
            console.log('Exemplar não pode ser devolvido, não está emprestado ou é privado');
        }
    }

    async calcularMulta(id_exemplar: number): Promise<void> {
        const exemplar = await this.ExemplarRepository.pesquisar({ id_exemplar } as Partial<Emprestimo>);
        if (!exemplar || exemplar.exemplarPrivado || !exemplar.idStatus) {
            console.log('Exemplar não encontrado ou não está emprestado.');
            return;
        }

        let dataAtual = new Date();
        if (exemplar.dataDevolucaoPrevista < dataAtual) {
            let diasAtraso = (dataAtual.getTime() - exemplar.dataDevolucaoPrevista.getTime()) / (1000 * 3600 * 24);
            console.log('Multa calculada: ' + diasAtraso + ' R$');
            this.emprestimoRepository.atualizar(id_exemplar, { multa: diasAtraso });
        } else {
            console.log('Sem atraso');
        }
    }

    async pagarMulta(idUsuario: number): Promise<void> {

        const cliente = await this.ClienteRepository.pesquisar({ idUsuario } as Partial<Emprestimo>);
        if (!cliente) {
            console.log('Cliente não encontrado.');
            return;
        }
        if (cliente.multa > 0) {
            console.log('Multa: ' + cliente.multa);
            cliente.multa = 0;
            this.emprestimoRepository.atualizar(idUsuario, cliente.multa);
            console.log('Multa paga!');
            return;
        }
        
    }

    async verificarMultaAntesDeEmprestar(idUsuario: number): Promise<void> {
        const cliente = await this.ClienteRepository.pesquisar({ idUsuario } as Partial<Emprestimo>);
        if (!cliente) {
            console.log('Cliente não encontrado.');
            return;
        }
        if (cliente.multa > 0) {
            console.log('Cliente possui multa pendente.');
            console.log('Multa: ' + cliente.multa);
            this.emprestimoRepository.pesquisar( cliente.multa);
            return;
        }

    }

    async validarExemplardaBiblioteca(livro): Promise<boolean> {
        const exemplardisponivel = [];

        exemplardisponivel.push(this.ExemplarRepository.filter(exemplar => exemplar.idStatus === false && exemplar.Livro === livro));
        if (exemplardisponivel.length === 1) {
            console.log('Leitura apenas Disponivel na Biblioteca');
            return false;
        }
        else {
            return true;
        }
        
    }

}