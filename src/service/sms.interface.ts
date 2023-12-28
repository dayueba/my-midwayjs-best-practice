export interface SmsInterface {
  sendSms(phoneNumber: string): Promise<void>;
}
