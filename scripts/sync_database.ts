import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { Account } from '../src/accounts/account.model';
import { User } from '../src/users/user.model';
import { Saving } from '../src/savings/saving.model';
import { Goal } from '../src/goals/goal.model';
import { Session } from '../src/sessions/session.model';

const connectionOptions: SequelizeOptions = {
  dialect: 'postgres',
  host: 'localhost',
  database: 'simple_budget',
  models: [User, Account, Saving, Goal, Session],
};

const syncModels = async () => {
  const connection = new Sequelize(connectionOptions);
  await connection.sync({ alter: true });
  const existingUser = await User.findOne({
    where: { email: process.env.SEED_USER },
  });
  if (!existingUser) {
    const user = new User({ email: process.env.SEED_USER });
    await user.save();
  }
  await connection.close();
};

syncModels().catch((err) => {
  console.log(err);
  process.exit(1);
});
