import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Autor } from "./Autor";

@Entity()
export class Livro {
    @PrimaryGeneratedColumn()
    id_livro: number;

    @Column()
    titulo: string;

    @Column({ type: "datetime", nullable: true, default: () => "CURRENT_TIMESTAMP" })
    dataPublicacao: Date;

    @Column()
    genero: string;

    @ManyToMany(() => Autor)
    @JoinTable()
    autores: Autor[];
}