import { Exemplar } from '../entity/Exemplar';
import { AppDataSource } from '../banco';
import { Repository } from 'typeorm';

export class ExemplarService {
    private repository: Repository<Exemplar>;

    constructor() {
        this.repository = AppDataSource.getRepository(Exemplar);
    }

    async criar(Exemplar: Exemplar): Promise<Exemplar> {
        return await this.repository.save(Exemplar);
    }

    async remover(c: Exemplar): Promise<Exemplar> {
       return await this.repository.remove(c);
    }

    async listar(): Promise<Exemplar[]>{
        return await this.repository.find();
    }
    
    async obter(id: number): Promise<Exemplar>{
        return await this.repository.findOneBy({id_exemplar: id});
    }

    async pesquisar(Exemplar: Partial<Exemplar>): Promise<Exemplar | null> {
        return await this.repository.findOne({where : Exemplar});
    }

    async atualizar(id: number, c: Partial<Exemplar>): Promise<void>{
        await this.repository.update(id, c);
    }

}