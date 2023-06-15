import {
  Column,
  CreatedAt,
  DataType,
  Default,
  DeletedAt,
  HasMany,
  Index,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { Account } from '../accounts/account.model';
import { Goal } from '../goals/goal.model';
import { Saving } from '../savings/saving.model';

@Table({ paranoid: true })
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID, allowNull: false })
  declare id: string;

  @Unique
  @Column({ type: DataType.STRING, allowNull: false })
  declare email: string;

  @HasMany(() => Account, 'userId')
  declare accounts: Account[];

  @HasMany(() => Saving, 'userId')
  declare savings: Saving[];

  @HasMany(() => Goal, 'userId')
  declare goals: Goal[];

  @CreatedAt
  declare creationDate: Date;

  @UpdatedAt
  declare updatedOn: Date;

  @Index
  @DeletedAt
  declare deletionDate: Date;
}
