import { CommandHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { DatabaseService } from 'src/database/database.service';
import { User } from 'src/entities/user.entity';
import { GetUserDto } from 'src/user/dto/get.dto';
import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements IQueryHandler<CreateUserCommand> {
  public constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly databaseService: DatabaseService
  ) {}

  public async execute(command: CreateUserCommand): Promise<GetUserDto> {
    let userEntity: User;
    try {
      userEntity = await this.userModel.create(command.data, { raw: true });
    } catch (err) {
      this.databaseService.HandleDatabaseError(err);
    }

    return <GetUserDto>userEntity;
  }
}
