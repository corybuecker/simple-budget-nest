import { Controller, Get } from '@nestjs/common';

@Controller('/api/accounts')
export class AccountsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
