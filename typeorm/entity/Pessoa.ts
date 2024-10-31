import { Entity, Column,PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Pessoa{

    @PrimaryGeneratedColumn()
    id_pessoa: number;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    telefone: string;

    @Column()
    endereco: string;

}