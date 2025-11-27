import { Column, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Entity } from "typeorm";
import { Pet } from "../../pet/entities/pet.entity";
import { Veterinary } from "../../veterinary/entities/veterinary.entity";
import { CashFlow } from "../../cash-flow/entities/cash-flow.entity";
import { Installment } from "../../installment/entities/installment.entity";
import { SupplyType } from "../../supply-type/entities/supply-type.entity";

@Entity()
export class Visit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('datetime')
  dateTime: string;

  @Column('varchar', {length: 255})
  diagnostic: string;

  @Column('float')
  amount: number;

  @ManyToOne(() => Pet, (pet) => pet.visits)
  pet: Pet;

  @ManyToOne(() => Veterinary, (veterinary) => veterinary.visits)
  veterinary: Veterinary;

  @ManyToOne(() => CashFlow, (cashFlow) => cashFlow.visits)
  cashFlow: CashFlow;

  @OneToMany(() => Installment, (installments) => installments.visit)
  installments: Installment[];

  @ManyToMany(() => SupplyType)
  @JoinTable()
  supplyTypes: SupplyType[]
}
