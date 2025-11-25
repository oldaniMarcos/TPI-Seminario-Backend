import { Column, ManyToOne, PrimaryGeneratedColumn, Entity } from "typeorm";
import { SupplyType } from "../../supply-type/entities/supply-type.entity";

@Entity()
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
