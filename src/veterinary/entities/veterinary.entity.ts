import { Column, OneToMany, PrimaryGeneratedColumn, Entity } from "typeorm";
import { Visit } from "../../visit/entities/visit.entity";

@Entity()
export class Veterinary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {length: 25})
  licenseNumber: string;
  
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

  @Column('varchar', {length: 100})
  email: string;

  @Column('varchar', {length: 4})
  state: 'alta' | 'baja';

  @OneToMany(() => Visit, (visits) => visits.veterinary)
  visits: Visit[];
}
