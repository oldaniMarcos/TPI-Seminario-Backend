import { Column, ManyToOne, PrimaryGeneratedColumn, Entity } from "typeorm";
import { SupplyType } from "../../supply-type/entities/supply-type.entity";

@Entity()
export class SupplyPrice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('date')
  beginDate: string;

  @Column('varchar', {length: 3})
  currency: string;

  @Column('float')
  price: number;

  @ManyToOne(() => SupplyType, (supplyType) => supplyType.supplyPrices)
  supplyType: SupplyType;
}
