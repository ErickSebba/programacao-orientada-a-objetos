import { Autor } from '../entity/Autor';
import { AppDataSource } from '../banco';
import { Repository } from 'typeorm';

export class AutorRepository {
    private repository: Repository<Autor>;

    constructor() {
        this.repository = AppDataSource.getRepository(Autor);
    }

    async criar(autor: Autor): Promise<Autor> {
        return await this.repository.save(autor);
    }

    async remover(c: Autor): Promise<Autor> {
        return await this.repository.remove(c);
     }
 
     async listar(): Promise<Autor[]>{
         return await this.repository.find();
     }
     
     async obter(id: number): Promise<Autor>{
         return await this.repository.findOneBy({id_autor: id});
     }
 
     async pesquisar(Autor: Partial<Autor>): Promise<Autor | null> {
         return await this.repository.findOne({where : Autor});
     }
 
     async atualizar(id: number, c: Partial<Autor>): Promise<void>{
         await this.repository.update(id, c);
     }
}
