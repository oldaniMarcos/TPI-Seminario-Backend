import { Column, ManyToOne, PrimaryGeneratedColumn, Entity } from "typeorm";
import { SupplyType } from "../../supply-type/entities/supply-type.entity";

@Entity()
export class Lot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {length: 50})
  lotNumber: string;

  @Column('date')
  dueDate: string;

  @Column('int')
  units: number;

  @ManyToOne(() => SupplyType, (supplyType) => supplyType.lots)
  supplyType: SupplyType;
}
