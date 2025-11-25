import { Column, OneToMany, PrimaryGeneratedColumn, Entity } from "typeorm";
import { Pet } from "../../pet/entities/pet.entity";

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  docNum: string;

  @Column()
  docType: string;

  @Column()
  fullName: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  state: string;

  @OneToMany(() => Pet, (pets) => pets.client)
  pets: Pet[]
}
