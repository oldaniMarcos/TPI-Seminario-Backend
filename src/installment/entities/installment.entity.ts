import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Visit } from "../../visit/entities/visit.entity";

export class Installment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dueDate: string;

  @Column()
  amount: number;

  @Column()
  payDate: string;

  @ManyToOne(() => Visit, (visit) => visit.installments)
  visit: Visit;
}
