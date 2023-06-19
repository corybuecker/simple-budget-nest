import Decimal from 'decimal.js';
import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  DeletedAt,
  Index,
  Model,
  PrimaryKey,
  UpdatedAt,
  Table,
} from 'sequelize-typescript';
import { Recurrence } from '../types';
import { User } from '../users/user.model';

@Table({ paranoid: true })
export class Goal extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID, allowNull: false })
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
    get() {
      return new Decimal(this.getDataValue('amount') as string);
    },
  })
  declare amount: Decimal;

  @Column({
    allowNull: false,
    type: DataType.ENUM(...Object.values(Recurrence)),
    defaultValue: Recurrence.MONTHLY,
  })
  declare recurrence: Recurrence;

  @Column({
    allowNull: true,
    type: DataType.DATEONLY,
    get() {
      return new Date(this.getDataValue('targetDate') as string);
    },
  })
  declare targetDate: Date;

  @BelongsTo(() => User, 'userId')
  declare user: User;

  @CreatedAt
  declare creationDate: Date;

  @UpdatedAt
  declare updatedOn: Date;

  @Index
  @DeletedAt
  declare deletionDate: Date;
}
