import { Column, ManyToOne, PrimaryGeneratedColumn, Entity } from "typeorm";
import { Visit } from "../../visit/entities/visit.entity";

@Entity()
export class Installment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('date')
  dueDate: string;

  @Column('float')
  amount: number;

  @Column('date')
  payDate: string;

  @ManyToOne(() => Visit, (visit) => visit.installments)
  visit: Visit;
}
