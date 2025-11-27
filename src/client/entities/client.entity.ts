import { Column, OneToMany, PrimaryGeneratedColumn, Entity } from "typeorm";
import { Pet } from "../../pet/entities/pet.entity";

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {length: 25})
  docNum: string;

  @Column('varchar', {length: 3})
  docType: string;

  @Column('varchar', {length: 50})
  fullName: string;

  @Column('varchar', {length: 25})
  phone: string;

  @Column('varchar', {length: 50})
  address: string;

  @Column('varchar', {length: 4})
  state: 'alta' | 'baja';

  @OneToMany(() => Pet, (pets) => pets.client)
  pets: Pet[]
}
