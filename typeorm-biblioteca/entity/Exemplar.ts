// entity/Exemplar.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Livro } from "./Livro";

@Entity()
export class Exemplar {
    @PrimaryGeneratedColumn()
    id_exemplar: number;

    @Column()
    idStatus: boolean;

    @Column()
    exemplarPrivado: boolean;

    @ManyToOne(() => Livro)
    livro: Livro;

    @Column({ type: "datetime", nullable: true, default: () => "CURRENT_TIMESTAMP" })
    dataDevolucaoPrevista: Date;
}