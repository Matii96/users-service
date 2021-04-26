import { CommandHandler, EventPublisher, IQueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { DatabaseService } from 'src/database/database.service';
import { UserEntity } from 'src/repository/user.entity';
import { GetUserDto } from 'src/user/dto/get.dto';
import { CreateUserCommand } from './create-user.command';
import { User } from 'src/user/models/user.model';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements IQueryHandler<CreateUserCommand> {
  public constructor(
    @InjectModel(UserEntity) private readonly userModel: typeof UserEntity,
    private readonly publisher: EventPublisher,
    private readonly databaseService: DatabaseService
  ) {}

  public async execute(command: CreateUserCommand): Promise<GetUserDto> {
    let userEntity: UserEntity;
    try {
      userEntity = await this.userModel.create(command.data, { raw: true });
    } catch (err) {
      this.databaseService.HandleDatabaseError(err);
    }

    const user = this.publisher.mergeObjectContext(new User(userEntity));
    user.register();
    user.commit();

    return <GetUserDto>userEntity;
  }
}
