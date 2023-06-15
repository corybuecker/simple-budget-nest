import { SessionData } from 'express-session';
import {
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  Index,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ paranoid: true })
export class Session extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  declare id: number;

  @Index({
    unique: true,
    where: {
      deletionDate: null,
    },
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare sessionId: string;

  @Index
  @Column({ allowNull: false })
  declare expiredAt: Date;

  @Column({ type: DataType.JSONB, allowNull: true })
  declare json: SessionData;

  @CreatedAt
  declare creationDate: Date;

  @UpdatedAt
  declare updatedOn: Date;

  @DeletedAt
  declare deletionDate: Date;
}
