import { Op } from 'sequelize';
import { Model, DataType, Column, Table, ForeignKey, BelongsTo, BeforeBulkCreate } from 'sequelize-typescript';
import { UserEntity } from './user.entity';
import config from 'config';

@Table
export class LoginHistoryEntity extends Model<LoginHistoryEntity> {
  @Column({ type: DataType.STRING })
  public address: string;

  @Column({ type: DataType.STRING })
  public browser: string;

  @ForeignKey((): typeof Model => UserEntity)
  @Column
  public userId: number;

  @BelongsTo((): typeof Model => UserEntity, { onDelete: 'CASCADE' })
  public user: UserEntity;

  @BeforeBulkCreate
  public static async RemoveOldest() {
    if (config.storageLimits.userLoginHistory < 0) {
      return;
    }
    const limitDate: Date = new Date();
    limitDate.setMonth(limitDate.getMonth() - config.storageLimits.userLoginHistory);
    await LoginHistoryEntity.destroy({ where: { createdAt: { [Op.lt]: limitDate } } });
  }
}
