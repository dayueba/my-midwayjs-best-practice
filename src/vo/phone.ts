export class ValidateError extends Error {
  constructor(public readonly message: string) {
    super(message);
  }
}

export class PhoneNumber {
  constructor(public readonly phone: string) {
    if (phone === null) {
      throw new ValidateError('phone cannot be null');
    } else if (!this.isValid(phone)) {
      throw new ValidateError('phone is not valid');
    }
    this.phone = phone;
  }

  isValid(number: string) {
    return /^\d{11}$/.test(number);
  }
}
