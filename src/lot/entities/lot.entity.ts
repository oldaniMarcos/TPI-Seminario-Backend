import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SupplyType } from "../../supply-type/entities/supply-type.entity";

export class Lot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lotNumber: string;

  @Column()
  dueDate: string;

  @Column()
  units: number;

  @ManyToOne(() => SupplyType, (supplyType) => supplyType.lots)
  supplyType: SupplyType;
}
