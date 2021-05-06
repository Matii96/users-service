import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserDto } from 'src/user/dto/get.dto';
import { GetUserQuery } from './get-user.query';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  public constructor() {}

  public async execute(query: GetUserQuery): Promise<GetUserDto> {
    return query.user.FormatData();
  }
}
