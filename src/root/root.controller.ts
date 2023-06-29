import { Controller, Get, Render, UseFilters, UseGuards } from '@nestjs/common';
import { SessionGuard } from '../auth/session.guard';
import { RootFilter } from './root.filter';
import { RootService } from './root.service';

@Controller('')
@UseFilters(RootFilter)
@UseGuards(SessionGuard)
export class RootController {
  constructor(private rootService: RootService) {}

  @Get('/')
  @Render('index')
  public root() {
    return {};
  }

  @Get('/dashboard')
  @Render('index')
  public dashboard() {
    return {};
  }
  @Get('/accounts*')
  @Render('index')
  public accounts() {
    return {};
  }

  @Get('/savings*')
  @Render('index')
  public savings() {
    return {};
  }

  @Get('/goals*')
  @Render('index')
  public goals() {
    return {};
  }
}
