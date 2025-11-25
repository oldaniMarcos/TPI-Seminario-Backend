import { Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Species } from "../../species/entities/species.entity";
import { Pet } from "../../pet/entities/pet.entity";

export class Breed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @ManyToOne(() => Species, (species) => species.breeds)
  species: Species

  @OneToMany(() => Pet, (pets) => pets.breed)
  pets: Pet[]
}
