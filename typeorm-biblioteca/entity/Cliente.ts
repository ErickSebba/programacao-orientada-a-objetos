// entity/Cliente.ts
import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Pessoa } from "./Pessoa";

@Entity()
export class Cliente {
    @PrimaryGeneratedColumn()
    id_Cliente: number;

    @OneToOne(() => Pessoa)
    @JoinColumn()
    pessoa: Pessoa;
}