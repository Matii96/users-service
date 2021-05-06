import { Model, DataType, Column, Table, BeforeCreate, BeforeUpdate } from 'sequelize-typescript';
import { hashSync, compareSync } from 'bcrypt';
import config from 'config';

@Table
export class User extends Model<User> {
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

  @Column({ type: DataType.STRING })
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

  @BeforeCreate
  @BeforeUpdate
  public static hashPassword(user: User): void {
    if (user.password) {
      user.password = hashSync(user.password.trim(), config.authentication.userPasswordSalt);
    }
  }
}
