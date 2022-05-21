import { Interval } from '@/classes/_index';
import type { IntervalOptions } from '@/types';

const add = (options: IntervalOptions) => {
   return new Interval(options);
};

const useInterval = () => ({
   add: add,
});

export default useInterval;
