import { Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, Entity } from "typeorm";
import { Species } from "../../species/entities/species.entity";
import { Pet } from "../../pet/entities/pet.entity";

@Entity()
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
