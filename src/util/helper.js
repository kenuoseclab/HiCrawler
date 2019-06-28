import uuid from 'uuid/v4';
import moment from 'moment';

export function bytesToSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const strSize = (bytes / Math.pow(k, i)).toPrecision(3);
  return `${strSize} ${sizes[i]}`;
}

export function fixedNumber(number, digits = 2, isFixed = true) {
  if (isFixed) {
    return number.toFixed(digits);
  }
  return number;
}

export function generateUUID() {
  return uuid();
}

export function formattedNumber(number) {
  return `${number}`.replace(/(\d)(?=(\d{3})+\b)/g, '$1,');
}

export function formatDate(date) {
  return moment(date).format('YYYY/MM/DD HH:mm');
}
