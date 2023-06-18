import { DataType } from 'sequelize-typescript';
import { Migration } from '../migrator';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.createTable('Sessions', {
    id: {
      type: DataType.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    sessionId: {
      type: DataType.STRING,
      allowNull: false,
    },
    expiredAt: {
      type: DataType.DATE,
      allowNull: false,
    },
    json: {
      type: DataType.JSONB,
    },
    creationDate: {
      type: DataType.DATE,
      allowNull: false,
    },
    updatedOn: {
      type: DataType.DATE,
      allowNull: false,
    },
    deletionDate: {
      type: DataType.DATE,
    },
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.dropTable('Sessions');
};
