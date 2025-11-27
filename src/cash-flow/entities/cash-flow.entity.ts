import { Column, OneToMany, PrimaryGeneratedColumn, Entity } from "typeorm";
import { Withdrawal } from "../../withdrawal/entities/withdrawal.entity";
import { Visit } from "../../visit/entities/visit.entity";

@Entity()
export class CashFlow {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('date')
  closeDate: string;

  @Column('char')
  closeType: string;

  @Column('float')
  initialAmount: number;

  @Column('float')
  inflows: number;

  @Column('float')
  outflows: number;

  @OneToMany(() => Withdrawal, (withdrawals) => withdrawals.cashFlow)
  withdrawals: Withdrawal[];

  @OneToMany(() => Visit, (visits) => visits.cashFlow)
  visits: Visit[];
}
