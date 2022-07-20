import { Range } from '@/types';

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
