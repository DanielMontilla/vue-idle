import { Interval } from '@/classes/_index';
import type { IntervalOptions } from '@/types';
import { ref } from 'vue';

const get = (options: IntervalOptions) => {
   return ref(new Interval(options));
};

const useInterval = () => ({
   get: get,
});

export default useInterval;
