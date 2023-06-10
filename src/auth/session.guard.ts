import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/user.model';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(@InjectModel(User) private userModel: typeof User) {}
  async canActivate(context: ExecutionContext) {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();

    if (request.session.profile) {
      const emails = request?.session?.profile?.emails;
      if (emails) {
        const user = await this.userModel.findOne({
          where: { email: emails.length > 0 ? emails[0].value : null },
        });
        if (user) {
          request.simpleBudgetUser = user;
        }
      }
      return true;
    } else {
      return false;
    }
  }
}
