import { DataType } from 'sequelize-typescript';
import { Migration } from '../migrator';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.createTable('Users', {
    id: {
      type: DataType.UUID,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataType.STRING,
      allowNull: false,
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
  await sequelize.dropTable('Users');
};
