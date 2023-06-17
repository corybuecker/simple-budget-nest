import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from 'express';
import { User } from '../users/user.model';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(@InjectModel(User) private userModel: typeof User) {}
  async canActivate(context: ExecutionContext) {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();
    const emails = request?.session?.profile?.emails;

    console.log(request.headers);

    if (emails) {
      const user = await this.userModel.findOne({
        where: { email: emails[0].value },
      });

      if (!user) throw new ForbiddenException();

      request.userId = user.id;
      return true;
    }
    return false;
  }
}
