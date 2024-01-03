import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1703748217865_6388',
  koa: {
    port: 7001,
  },
  midwayLogger: {
    clients: {
      typeormLogger: {
        fileLogName: 'midway-typeorm.log',
        enableError: false,
        level: 'info',
      },
    },
  },
  typeorm: {
    dataSource: {
      default: {
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: '123456',
        database: 'rent_daily',
        synchronize: false, // 如果第一次使用，不存在表，有同步的需求可以写 true，注意会丢数据
        maxQueryExecutionTime: 1,
        entities: ['**/entity/*.entity{.ts,.js}'],
      },
    },
  },
} as MidwayConfig;
