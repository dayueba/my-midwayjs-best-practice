// @Provide('UserDao')  // 使用哪个dao则要导出这个dao，注释另一个方法中的dao
import { IUserDao } from './user.dao.interfce';

export class UserDao implements IUserDao {
  findAll(): Promise<any> {
    return Promise.resolve('find all by sequelize');
  }
}
