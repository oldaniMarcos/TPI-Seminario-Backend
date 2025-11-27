import { Column, ManyToOne, OneToMany, PrimaryGeneratedColumn, Entity } from "typeorm";
import { Client } from "../../client/entities/client.entity";
import { Breed } from "../../breed/entities/breed.entity";
import { Visit } from "../../visit/entities/visit.entity";

@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {length: 50})
  name: string;

  @Column('date')
  birthDate: string;

  @Column('int')
  age: number;

  @Column('varchar', {length: 4})
  state: 'alta' | 'baja';

  @ManyToOne(() => Client, (client) => client.pets)
  client: Client;

  @ManyToOne(() => Breed, (breed) => breed.pets)
  breed: Breed;

  @OneToMany(() => Visit, (visits) => visits.pet)
  visits: Visit[];
}
