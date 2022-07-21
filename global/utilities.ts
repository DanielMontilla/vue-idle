import { Range } from '@/types';
import { faker } from '@faker-js/faker';

// TODO: create 'ext' type to constraint input
export const getPath = (path: string, options?: { ext?: string }) => {
   options = options
      ? options
      : {
           ext: 'svg',
        };

   let { ext } = options;
   ext = ext ? ext : 'svg';

   return `${path}.${ext}`;
};

export const recordLength = <T extends string | number | symbol>(
   record: Record<T, any>
) => {
   let count = 0;
   for (const key in record) {
      if (Object.prototype.hasOwnProperty.call(record, key)) count++;
   }
   return count;
};

/**
 * @copyright https://rosettacode.org/wiki/Map_range
 * @returns linearly mapped value from range A to range B
 */
export const mapValue = (value: number, rangeA: Range, rangeB: Range) => {
   let { min: minA, max: maxA } = rangeA;
   let { min: minB, max: maxB } = rangeB;

   return minB + ((value - minA) * (maxB - minB)) / (maxA - minA);
};

export const wholeDivide = (
   dividend: number,
   divisor: number
): [quotient: number, remainder: number] => {
   let quotient = Math.floor(dividend / divisor);
   let remainder = dividend - quotient * divisor;

   return [quotient, remainder];
};

/* ➗ Math */
export const rand = (min: number = 0, max: number = 1) =>
   Math.random() * (max - min) + min;
export const randInt = (min: number = 0, max: number = 1) => Math.round(rand(min, max));
export const isEven = (num: number) => (num & (num - 1)) === 0;
export const randArrPick = <T>(arr: T[] | readonly T[]): T =>
   arr[randInt(0, arr.length - 1)];

/**
 * @param record record from which to pick random value
 * @returns random value from specified record
 */
export const randRecValPick = <T>(record: Record<string | number | symbol, T>): T => {
   let keys = Object.keys(record);
   return record[randArrPick(keys)];
};
/**
 * @param {Record} record record from which to pick random key
 * @returns {string} random key from specified record
 */
export const randRecKeyPick = <T extends string | number>(record: Record<T, any>): T => {
   let keys = Object.keys(record).map<T>(k => {
      let { parseInt, isNaN } = Number;
      let nk = parseInt(k);
      return (isNaN(nk) ? k : nk) as T;
   });
   return randArrPick(keys);
};

/* 💬 dummy data generation */
export const randName = (): string => faker.name.firstName();
