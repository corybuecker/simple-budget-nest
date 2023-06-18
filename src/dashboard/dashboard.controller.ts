import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { SessionGuard } from '../auth/session.guard';
import { DashboardService } from './dashboard.service';

@Controller('api/dashboard')
@UseGuards(SessionGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}
  @Get()
  public async get(@Req() req: Request) {
    return {
      currentlyAvailable: await this.dashboardService.currentlyAvailable(
        req.userId,
      ),
    };
  }
}
