import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IRequestUser } from '../interfaces/request.interface';
import { UserSimple } from '../models/user.model';

@Injectable()
export class AccessUser implements CanActivate {
  public constructor(@InjectModel(UserSimple) private userModel: typeof UserSimple) {}

  private CheckAccess(id: string): Promise<UserSimple> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.userModel.findOne({ where: { id } });
        if (!user) {
          throw new NotFoundException();
        }
        resolve(user);
      } catch (err) {
        reject(err);
      }
    });
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: IRequestUser = context.switchToHttp().getRequest();
    if (!req.params.id) {
      return true;
    }
    const user = await this.CheckAccess(req.params.id);
    req.user = user;
    return true;
  }
}
