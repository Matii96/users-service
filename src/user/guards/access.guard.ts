import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IRequestUser } from '../interfaces/request.interface';
import { User } from 'src/entities/user.entity';
import { UserAggregate } from '../models/user.model';

@Injectable()
export class AccessUser implements CanActivate {
  public constructor(@InjectModel(User) private userModel: typeof User) {}

  private CheckAccess(id: string): Promise<UserAggregate> {
    return new Promise(async (resolve, reject) => {
      try {
        const userEntity = await this.userModel.findOne({ where: { id } });
        if (!userEntity) {
          throw new NotFoundException();
        }
        resolve(new UserAggregate(userEntity));
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
