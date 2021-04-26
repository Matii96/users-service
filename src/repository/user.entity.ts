import { Model, DataType, Column, Table } from 'sequelize-typescript';
import { hashSync, compareSync } from 'bcrypt';
import config from 'config';

@Table
export class UserEntity extends Model<UserEntity> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: { name: 'name', msg: 'collidingName' }
  })
  public name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public fullName: string;

  @Column({ type: DataType.STRING(4096) })
  public description: string;

  @Column({
    type: DataType.STRING,
    set(val: string): void {
      // @ts-ignore
      this.setDataValue('password', hashSync(val.trim(), config.authentication.userPasswordSalt));
    }
  })
  public password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: { name: 'email', msg: 'collidingEmail' }
  })
  public email: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'en' })
  public lang: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  public active: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  public emailNotification: boolean;

  public ComparePassword(password: string): boolean {
    return compareSync(password, this.password);
  }
}
