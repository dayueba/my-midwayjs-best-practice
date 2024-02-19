import { Inject, Provide } from '@midwayjs/core';
import { IUserOptions } from '../interface';
import { UsersEntity } from '../entity/user.entity';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { IUserDao } from '../dao/user.dao.interfce';
import { Name } from '../vo/name';
import { PhoneNumber } from '../vo/phone';
import { RuleType, Valid } from '@midwayjs/validate';

@Provide()
export class UserService {
  @InjectEntityModel(UsersEntity)
  userModel: Repository<UsersEntity>;

  @Inject('UserDao')
  userDao: IUserDao;

  async getUser(options: IUserOptions) {
    // return {
    // uid: options.uid,
    //username: 'mockedName',
    //phone: '12345678901',
    // email: 'xxx.xxx@xxx.com',
    //};
    return await this.userModel.findOneBy({
      id: options.uid,
    });
  }

  async findAll() {
    return await this.userDao.findAll();
  }

  async findByNameAndPhone(
    @Valid(RuleType.object().required()) name: Name,
    @Valid(RuleType.object().required()) phone: PhoneNumber
  ) {
    console.log(name, phone);
  }
}
