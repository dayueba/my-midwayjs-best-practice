import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    length: 50,
    name: 'nickname',
    nullable: false,
  })
  nickname: string;

  @Column('varchar', {
    length: 50,
    name: 'phone',
    nullable: false,
  })
  phone: string;

  @Column('varchar', {
    length: 100,
    name: 'avatar',
    nullable: false,
  })
  avatar: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
