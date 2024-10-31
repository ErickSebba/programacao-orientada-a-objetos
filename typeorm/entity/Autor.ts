import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn, ManyToMany } from "typeorm";
import { Pessoa } from "./Pessoa";
import { Livro } from "./Livro";

@Entity()
export class Autor{

  @PrimaryGeneratedColumn()
  id_autor: number;

  @OneToOne(() => Pessoa)
  @JoinColumn()
  pessoa: Pessoa

/*  constructor(nome?: string, duracao?: number){
    this.nome = nome;
    this.duracao = duracao;
}*/
  
  
}


