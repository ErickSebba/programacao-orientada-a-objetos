import { Livro } from '../entity/Livro';
import { AppDataSource } from '../banco';
import { Repository } from 'typeorm';

export class LivroService {
    private repository: Repository<Livro>;

    constructor() {
        this.repository = AppDataSource.getRepository(Livro);
    }

    async criar(Livro: Livro): Promise<Livro> {
        return await this.repository.save(Livro);
    }

    async remover(c: Livro): Promise<Livro> {
       return await this.repository.remove(c);
    }

    async listar(): Promise<Livro[]>{
        return await this.repository.find();
    }
    
    async obter(titulo: string): Promise<Livro>{
        return await this.repository.findOneBy({titulo: titulo});
    }

    async pesquisar(Livro: Partial<Livro>): Promise<Livro | null> {
        return await this.repository.findOne({where : Livro});
    }

    async atualizar(id: number, c: Partial<Livro>): Promise<void>{
        await this.repository.update(id, c);
    }

}