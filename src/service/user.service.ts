import { Provide } from '@midwayjs/core';
import { IUserOptions } from '../interface';
import { UsersEntity } from '../entity/user.entity';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';

@Provide()
export class UserService {
  @InjectEntityModel(UsersEntity)
  userModel: Repository<UsersEntity>;
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
}
