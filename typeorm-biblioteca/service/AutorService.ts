import { Autor } from '../entity/Autor';
import { AppDataSource } from '../banco';
import { Repository } from 'typeorm';

export class AutorService {
    private repository: Repository<Autor>;

    constructor() {
        this.repository = AppDataSource.getRepository(Autor);
    }

    async criar(Autor: Autor): Promise<Autor> {
        return await this.repository.save(Autor);
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

    async validarAutor(autor: Autor): Promise<boolean> {
        if (!autor.pessoa.nome || autor.pessoa.nome.trim().length === 0) {
            return false;
        }
        if (!autor.pessoa.email || !autor.pessoa.email.includes('%@%.com')) {
            return false;
        }
        
        return true;
    }
}