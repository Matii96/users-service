import { CommandHandler, EventPublisher, IQueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { UserEntity } from 'src/repository/user.entity';
import { RemoveUserCommand } from './remove-user.command';

@CommandHandler(RemoveUserCommand)
export class RemoveUserHandler implements IQueryHandler<RemoveUserCommand> {
  public constructor(
    @InjectModel(UserEntity) private readonly userModel: typeof UserEntity,
    private readonly publisher: EventPublisher
  ) {}

  public async execute(command: RemoveUserCommand) {
    await this.userModel.destroy({ where: { id: command.id } });
  }
}
