import { Emprestimo } from '../entity/Emprestimo';
import { AppDataSource } from '../banco';
import { Repository } from 'typeorm';

export class EmprestimoRepository{
    private repository: Repository<Emprestimo>;

    constructor() {
        this.repository = AppDataSource.getRepository(Emprestimo);
    }

    async criar(emprestimo: Emprestimo): Promise<Emprestimo> {
        return await this.repository.save(emprestimo);
    }

    async remover(c: Emprestimo): Promise<Emprestimo> {
       return await this.repository.remove(c);
    }

    async listar(): Promise<Emprestimo[]>{
        return await this.repository.find();
    }
    
    async obter(id: number): Promise<Emprestimo>{
        return await this.repository.findOneBy({id_Emprestimo: id});
    }

    async pesquisar(Emprestimo: Partial<Emprestimo>): Promise<Emprestimo | null> {
        return await this.repository.findOne({where : Emprestimo});
    }

    async atualizar(id: number, c: Partial<Emprestimo>): Promise<void>{
        await this.repository.update(id, c);
    }


}


