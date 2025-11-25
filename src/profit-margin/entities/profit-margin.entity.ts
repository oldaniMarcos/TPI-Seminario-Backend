import { Column, PrimaryGeneratedColumn } from "typeorm";

export class ProfitMargin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  beginDate: string;

  @Column()
  mult: number;
}
