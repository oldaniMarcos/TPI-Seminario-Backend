import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CashFlow } from "../../cash-flow/entities/cash-flow.entity";

export class Withdrawal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dateTime: string;

  @Column()
  description: string;

  @Column()
  amount: number;

  @Column()
  state: string;

  @Column()
  payDate: string;

  @ManyToOne(() => CashFlow, (cashFlow) => cashFlow.withdrawals)
  cashFlow: CashFlow;
}