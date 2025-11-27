import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity()
export class ProfitMargin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('date')
  beginDate: string;

  @Column('float')
  mult: number;
}
