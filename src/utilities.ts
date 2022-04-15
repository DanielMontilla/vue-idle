export const rand = (min: number = 0, max: number = 1) => Math.random() * (max - min) + min;
export const randInt = (min: number = 0, max: number = 1) => Math.round(rand(min, max));
export const isEven = (num: number) => (num & (num - 1)) === 0;
export const randArrPick = <T>(arr: T[] | readonly T[]): T => arr[randInt(0, arr.length - 1)];
/**
 * @copyright https://rosettacode.org/wiki/Map_range
 * @returns linearly mapped value from range A to range B
 */
export const mapValue = (
   rangeA: [min: number, max: number],
   rangeB: [min: number, max: number],
   value: number
): number => {
   let [a1, a2] = rangeA;
   let [b1, b2] = rangeB;
   return b1 + ((value - a1) * (b2 - b1)) / (a2 - a1);
};

export const expCalc = (level: number) => Math.round(10 + 1.1 ** (level * 0.5));
export const recordLength = <T extends string | number | symbol>(record: Record<T, any>) => {
   let count = 0;
   for (const key in record) {
      if (Object.prototype.hasOwnProperty.call(record, key)) count++;
   }
   return count;
};
// export const durationCalc = (level: number) => {
//    return 10 + level * 0.8 * 3;
// };
