import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { GetLoginHistoryQuery } from './login-history.query';
import { UserLoginHistoryDto } from 'src/user/dto/login-history.dto';
import { LoginHistory } from 'src/entities/user-login-history.model';

@QueryHandler(GetLoginHistoryQuery)
export class GetLoginHistoryHandler implements IQueryHandler<GetLoginHistoryQuery> {
  public constructor(@InjectModel(LoginHistory) private loginHistoryModel: typeof LoginHistory) {}

  public async execute(query: GetLoginHistoryQuery): Promise<UserLoginHistoryDto[]> {
    const history = await this.loginHistoryModel.findAll({ where: { userId: query.id } });
    return this.AdjustData(history);
  }

  private AdjustData(data: LoginHistory[]) {
    return data.map(entry => ({ address: entry.address, browser: entry.browser }));
  }
}
