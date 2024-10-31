import { Cliente } from "../entity/Cliente";
import { AppDataSource } from '../banco';
import { EntityRepository, Repository } from "typeorm";

export class ClienteRepository {
    private repository: Repository<Cliente>;

    constructor() {
        this.repository = AppDataSource.getRepository(Cliente);
    }

    async criar(cliente: Cliente): Promise<Cliente> {
        return await this.repository.save(cliente);
    }

    async remover(c: Cliente): Promise<Cliente> {
        return await this.repository.remove(c);
     }
 
     async listar(): Promise<Cliente[]>{
         return await this.repository.find();
     }
     
     async obter(id: number): Promise<Cliente>{
         return await this.repository.findOneBy({id_Cliente: id});
     }
 
     async pesquisar(cliente: Partial<Cliente>): Promise<Cliente | null> {
         return await this.repository.findOne({where : cliente});
     }
 
     async atualizar(id: number, c: Partial<Cliente>): Promise<void>{
         await this.repository.update(id, c);
     }
}
