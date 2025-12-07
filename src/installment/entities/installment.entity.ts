import { Column, ManyToOne, PrimaryGeneratedColumn, Entity, JoinColumn } from "typeorm";
import { Visit } from "../../visit/entities/visit.entity";

@Entity()
export class Installment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('date')
  dueDate: string;

  @Column('float')
  amount: number;

  @Column('date', {nullable: true})
  payDate: string | "";

  @ManyToOne(() => Visit, (visit) => visit.installments)
  @JoinColumn({ name: 'visitId' })
  visit: Visit;
}
