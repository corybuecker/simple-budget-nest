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
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import Decimal from 'decimal.js';
import { User } from '../users/user.model';

@Table({ paranoid: true })
export class Account extends Model {
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
      return new Decimal(this.getDataValue('amount') as number);
    },
  })
  declare amount: Decimal;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare debt: boolean;

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
