import { CommandHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { DatabaseService } from 'src/database/database.service';
import { UserEntity } from 'src/repository/user.entity';
import { GetUserDto } from 'src/user/dto/get.dto';
import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements IQueryHandler<CreateUserCommand> {
  public constructor(
    @InjectModel(UserEntity) private readonly userModel: typeof UserEntity,
    private readonly databaseService: DatabaseService
  ) {}

  public async execute(command: CreateUserCommand): Promise<GetUserDto> {
    let userEntity: UserEntity;
    try {
      userEntity = await this.userModel.create(command.data, { raw: true });
    } catch (err) {
      this.databaseService.HandleDatabaseError(err);
    }

    return <GetUserDto>userEntity;
  }
}
