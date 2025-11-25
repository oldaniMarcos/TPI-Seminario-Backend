import { Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "../../client/entities/client.entity";
import { Breed } from "../../breed/entities/breed.entity";
import { Visit } from "../../visit/entities/visit.entity";

export class Pet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  birthDate: string;

  @Column()
  age: number;

  @Column()
  state: string;

  @ManyToOne(() => Client, (client) => client.pets)
  client: Client;

  @ManyToOne(() => Breed, (breed) => breed.pets)
  breed: Breed;

  @OneToMany(() => Visit, (visits) => visits.pet)
  visits: Visit[];
}
