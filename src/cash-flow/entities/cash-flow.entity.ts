import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Withdrawal } from "../../withdrawal/entities/withdrawal.entity";
import { Visit } from "../../visit/entities/visit.entity";

export class CashFlow {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  closeDate: string;

  @Column()
  closeType: string;

  @Column()
  initialAmount: number;

  @Column()
  inflows: number;

  @Column()
  outflows: number;

  @OneToMany(() => Withdrawal, (withdrawals) => withdrawals.cashFlow)
  withdrawals: Withdrawal[];

  @OneToMany(() => Visit, (visits) => visits.cashFlow)
  visits: Visit[];
}
