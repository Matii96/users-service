import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IRequestUser } from '../interfaces/request.interface';
import { User } from '../models/user.model';

@Injectable()
export class AccessUser implements CanActivate {
  public constructor(@InjectModel(User) private userModel: typeof User) {}

  private CheckAccess(id: string): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        const user: User = await this.userModel.findOne({ where: { id } });
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
