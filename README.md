个人认为使用midway.js中的最佳实践
====

1. 配置文件校验
2. 依赖抽象而不是具体实现
3. 利用好框架生命周期
```javascript
// 注意1：dev 环境默认等待2s就强制退出了，如果要测试不要使用开发环境
async onStop() {
    // 在这里去做服务像服务中心注销等功能
}

// 注意2: 耗时长的任务不建议使用@Destroy() 装饰器
// 因为是异步退出，所以框架退出后，会强制退出
```
4. 记录操作日志的最佳实践
```javascript
@Get('/test_log')
@LogRecord({
  successTemplate:
    '修改了订单的配送地址：从“{{@async getOldAddressByOrderNo(it.ctx.query.orderNo) /}}”, 修改到“{{it.ctx.query.address}}”',
  bizNo: '${ctx.query.orderNo}',
})
async updateAddress(@Query() query): Promise<any> {
  return query;
}
```
5. 通过orm记录慢查询日志
