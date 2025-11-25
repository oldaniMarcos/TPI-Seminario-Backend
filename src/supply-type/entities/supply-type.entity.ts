import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SupplyPrice } from "../../supply-price/entities/supply-price.entity";
import { Lot } from "../../lot/entities/lot.entity";

export class SupplyType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @OneToMany(() => SupplyPrice, (supplyPrices) => supplyPrices.supplyType)
  supplyPrices: SupplyPrice[];

  @OneToMany(() => Lot, (lots) => lots.supplyType)
  lots: Lot[];

  // many to many defined in Visit
}
