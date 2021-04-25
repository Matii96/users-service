import { Op } from 'sequelize';
import { Model, DataType, Column, Table, ForeignKey, BelongsTo, BeforeBulkCreate } from 'sequelize-typescript';
import { UserSimple } from './user.model';
import config from 'config';

@Table
export class LoginHistorySimple extends Model<LoginHistorySimple> {
  @Column({ type: DataType.STRING })
  public address: string;

  @Column({ type: DataType.STRING })
  public browser: string;

  @ForeignKey((): typeof Model => UserSimple)
  @Column
  public userId: number;

  @BelongsTo((): typeof Model => UserSimple, { onDelete: 'CASCADE' })
  public user: UserSimple;

  @BeforeBulkCreate
  public static async RemoveOldest() {
    if (config.storageLimits.userLoginHistory < 0) {
      return;
    }
    const limitDate: Date = new Date();
    limitDate.setMonth(limitDate.getMonth() - config.storageLimits.userLoginHistory);
    await LoginHistorySimple.destroy({ where: { createdAt: { [Op.lt]: limitDate } } });
  }
}
