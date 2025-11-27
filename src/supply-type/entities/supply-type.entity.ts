import { Column, OneToMany, PrimaryGeneratedColumn, Entity } from "typeorm";
import { SupplyPrice } from "../../supply-price/entities/supply-price.entity";
import { Lot } from "../../lot/entities/lot.entity";

@Entity()
export class SupplyType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {length: 50})
  description: string;

  @OneToMany(() => SupplyPrice, (supplyPrices) => supplyPrices.supplyType)
  supplyPrices: SupplyPrice[];

  @OneToMany(() => Lot, (lots) => lots.supplyType)
  lots: Lot[];

  // many to many defined in Visit
}
