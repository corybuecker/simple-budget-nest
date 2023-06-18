import { DataType } from 'sequelize-typescript';
import { Migration } from '../migrator';

enum GoalRecurrence {
  NEVER = 'never',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  YEARLY = 'yearly',
}

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.createTable('Goals', {
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
    recurrence: {
      type: DataType.ENUM(...Object.values(GoalRecurrence)),
      allowNull: false,
    },
    targetDate: {
      type: DataType.DATEONLY,
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
  await sequelize.addIndex('Goals', ['userId']);
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.dropTable('Goals');
};
