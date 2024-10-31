import { Entity, Column, OneToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "./Cliente";
import { Exemplar } from "./Exemplar";

@Entity()
export class Emprestimo{

    @PrimaryGeneratedColumn()
    id_Emprestimo: number;

    @Column()
    dataEmprestimo: Date;

    @Column({ type: "datetime", nullable: true, default: () => "CURRENT_TIMESTAMP" })
    dataDevolucaoPrevista: Date;

    @Column()
    multa: number;

    @OneToOne(() => Exemplar)
    @JoinColumn()
    exemplarEmprestado: Exemplar;

    @OneToOne(() => Cliente)
    @JoinColumn()
    cliente: Cliente;
    exemplar: Exemplar;


}