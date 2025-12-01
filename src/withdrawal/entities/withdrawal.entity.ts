import { Column, ManyToOne, PrimaryGeneratedColumn, Entity } from "typeorm";
import { CashFlow } from "../../cash-flow/entities/cash-flow.entity";

@Entity()
export class Withdrawal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('datetime')
  dateTime: string;

  @Column('varchar', {length: 100})
  description: string;

  @Column('float')
  amount: number;

  @Column('varchar', {length: 25})
  state: string;

  @Column('date', {nullable: true})
  payDate: string;

  @ManyToOne(() => CashFlow, (cashFlow) => cashFlow.withdrawals)
  cashFlow: CashFlow;
}