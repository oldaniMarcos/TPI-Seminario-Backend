import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity()
export class ProfitMargin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  beginDate: string;

  @Column()
  mult: number;
}
