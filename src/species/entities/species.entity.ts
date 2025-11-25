import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Breed } from "../../breed/entities/breed.entity";

export class Species {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @OneToMany(() => Breed, (breeds) => breeds.species)
  breeds: Breed[]
}
