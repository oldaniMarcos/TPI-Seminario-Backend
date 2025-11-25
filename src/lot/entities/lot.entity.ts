import { Column, ManyToOne, PrimaryGeneratedColumn, Entity } from "typeorm";
import { SupplyType } from "../../supply-type/entities/supply-type.entity";

@Entity()
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
