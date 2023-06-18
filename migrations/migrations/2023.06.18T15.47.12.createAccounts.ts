import { DataType } from 'sequelize-typescript';
import { Migration } from '../migrator';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.createTable('Accounts', {
    id: {
      type: DataType.UUID,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataType.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
    },
    amount: {
      type: DataType.DECIMAL,
      allowNull: false,
    },
    debt: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
  await sequelize.addIndex('Accounts', ['userId']);
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.dropTable('Accounts');
};
