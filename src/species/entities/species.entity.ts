import { Column, OneToMany, PrimaryGeneratedColumn, Entity } from "typeorm";
import { Breed } from "../../breed/entities/breed.entity";

@Entity()
export class Species {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {length: 50})
  description: string;

  @OneToMany(() => Breed, (breeds) => breeds.species)
  breeds: Breed[]
}
