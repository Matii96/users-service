import { BadRequestException, Injectable } from '@nestjs/common';
import { ValidationErrorItem } from 'sequelize';

@Injectable()
export class DatabaseService {
  public HandleDatabaseError(err: any): void {
    const errors: ValidationErrorItem[] = err.errors;
    if (!(errors && errors[0] instanceof ValidationErrorItem)) {
      throw err;
    }
    throw new BadRequestException(errors[0].message);
  }
}
