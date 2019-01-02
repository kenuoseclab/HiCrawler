import uuid from 'uuid/v4';

export default class Helper {
  static bytesToSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const strSize = (bytes / Math.pow(k, i)).toPrecision(3);
    return `${strSize} ${sizes[i]}`;
  }

  static fixedNumber(number, digits = 2, isFixed = true) {
    if (isFixed) {
      return number.toFixed(digits);
    }
    return number;
  }

  static generateUUID() {
    return uuid();
  }

  static formattedNumber(number) {
    return `${number}`.replace(/(\d)(?=(\d{3})+\b)/g, '$1,');
  }
}
