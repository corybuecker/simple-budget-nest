import { beforeEach, describe, expect, it } from '@jest/globals';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { LoggerModule } from '../logger/logger.module';
import { User } from '../users/user.model';
import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let service: DashboardService;

  beforeEach(async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
    const module: TestingModule = await Test.createTestingModule({
      providers: [DashboardService],
      imports: [
        LoggerModule,
        SequelizeModule.forFeature([User]),
        SequelizeModule.forRoot({
          dialect: 'postgres',
          host: 'localhost',
          username: 'postgres',
          database: 'simple_budget',
          autoLoadModels: false,
          synchronize: true,
          sync: { force: true },
        }),
      ],
    }).compile();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    service = module.get<DashboardService>(DashboardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
