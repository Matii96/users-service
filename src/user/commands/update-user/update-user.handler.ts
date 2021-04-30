import { CommandHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { DatabaseService } from 'src/database/database.service';
import { UserEntity } from 'src/repository/user.entity';
import { UpdateUserCommand } from './update-user.command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements IQueryHandler<UpdateUserCommand> {
  public constructor(
    @InjectModel(UserEntity) private readonly userModel: typeof UserEntity,
    private sequelize: Sequelize,
    private readonly databaseService: DatabaseService
  ) {}

  public async execute(command: UpdateUserCommand) {
    return this.sequelize.transaction(async t => {
      try {
        await this.userModel.update(command.data, { where: { id: command.id }, transaction: t });
      } catch (err) {
        this.databaseService.HandleDatabaseError(err);
      }
      return this.userModel.findByPk(command.id, { transaction: t, raw: true });
    });
  }
}
