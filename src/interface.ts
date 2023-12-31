/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  uid: number;
}

export interface LogRecordOptions {
  // 操作日志的文本模板
  successTemplate: string;
  // 操作日志失败的文本版本
  errTemplate?: string;
  // 操作日志的执行人
  operator?: string;
  // 操作日志绑定的业务对象标识
  bizNo: string;
  // 操作日志的种类
  category?: string;
  // 扩展参数，记录操作日志的修改详情
  detail?: string;
  // 记录日志的条件
  // condition?: boolean;
  condition?: (ctx: any) => boolean;
}
