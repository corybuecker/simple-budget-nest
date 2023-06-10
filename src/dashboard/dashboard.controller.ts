import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class DashboardController {
  @Get('/accounts*|/savings*')
  @Render('index')
  public get() {
    return {};
  }
}
