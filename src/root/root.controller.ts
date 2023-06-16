import {
  Controller,
  Get,
  Render,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
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
  public async root(@Req() request: Request) {
    return { initialContent: await this.rootService.pageContent(request) };
  }

  @Get('/accounts*')
  @Render('index')
  public async accounts(@Req() request: Request) {
    return { initialContent: await this.rootService.pageContent(request) };
  }

  @Get('/savings*')
  @Render('index')
  public async savings(@Req() request: Request) {
    return { initialContent: await this.rootService.pageContent(request) };
  }

  @Get('/goals*')
  @Render('index')
  public async goals(@Req() request: Request) {
    return { initialContent: await this.rootService.pageContent(request) };
  }
}
