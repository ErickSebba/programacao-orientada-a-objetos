import { Cliente } from '../entity/Cliente';
import { AppDataSource } from '../banco';
import { Repository } from 'typeorm';

export class ClienteService {
    private repository: Repository<Cliente>;

    constructor() {
        this.repository = AppDataSource.getRepository(Cliente);
    }

    async criar(Cliente: Cliente): Promise<Cliente> {
        return await this.repository.save(Cliente);
    }

    async remover(c: Cliente): Promise<Cliente> {
       return await this.repository.remove(c);
    }

    async listar(): Promise<Cliente[]>{
        return await this.repository.find();
    }
    
    async obter(id: number): Promise<Cliente>{
        return await this.repository.findOneBy({id_Cliente : id});
    }

    async pesquisar(Cliente: Partial<Cliente>): Promise<Cliente | null> {
        return await this.repository.findOne({where : Cliente});
    }

    async atualizar(id: number, c: Partial<Cliente>): Promise<void>{
        await this.repository.update(id, c);
    }

    async validarCliente(cliente: Cliente): Promise<boolean> {
        if (!cliente.pessoa.nome || cliente.pessoa.nome.trim().length === 0) {
            return false;
        }
        if (!cliente.pessoa.email || !cliente.pessoa.email.includes('%@%.com')) {
            return false;
        }
        
        return true;
    }

}