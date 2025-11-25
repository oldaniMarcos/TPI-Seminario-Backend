import { Column, OneToMany, PrimaryGeneratedColumn, Entity } from "typeorm";
import { Visit } from "../../visit/entities/visit.entity";

@Entity()
export class Veterinary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  licenseNumber: string;
  
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
  email: string;

  @Column()
  state: string;

  @OneToMany(() => Visit, (visits) => visits.veterinary)
  visits: Visit[];
}
