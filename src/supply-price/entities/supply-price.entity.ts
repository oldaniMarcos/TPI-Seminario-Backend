import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SupplyType } from "../../supply-type/entities/supply-type.entity";

export class SupplyPrice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  beginDate: string;

  @Column()
  currency: string;

  @Column()
  price: number;

  @ManyToOne(() => SupplyType, (supplyType) => supplyType.supplyPrices)
  supplyType: SupplyType;
}
