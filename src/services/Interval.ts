import { Interval } from '@/classes/_index';
import type { IntervalOptions } from '@/types';

const get = (options: IntervalOptions) => {
   return new Interval(options);
};

const useInterval = () => ({
   get: get,
});

export default useInterval;
