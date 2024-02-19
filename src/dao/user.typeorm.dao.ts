import { Provide } from '@midwayjs/core';
import { IUserDao } from './user.dao.interfce';

@Provide('UserDao')
export class UserDao implements IUserDao {
  findAll(): Promise<any> {
    return Promise.resolve('find all by typeorm');
  }
}
