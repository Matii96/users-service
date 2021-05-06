import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/entities/user.entity';
import { IRequestUserSimple } from '../interfaces/request.interface';

@Injectable()
export class AccessUserSimple implements CanActivate {
  public constructor(@InjectModel(User) private userModel: typeof User) {}

  private CheckAccess(id: string): Promise<User> {
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
    const req: IRequestUserSimple = context.switchToHttp().getRequest();
    if (!req.params.id) {
      return true;
    }
    const user = await this.CheckAccess(req.params.id);
    req.user = user;
    return true;
  }
}
