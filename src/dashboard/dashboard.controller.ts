import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class DashboardController {
  @Get('accounts*')
  @Render('index')
  public accounts() {
    return {};
  }

  @Get('savings*')
  @Render('index')
  public savings() {
    return {};
  }

  @Get('goals*')
  @Render('index')
  public goals() {
    return {};
  }
}
