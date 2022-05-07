import { Interval } from '@/classes/_index';
import type { IntervalOptions } from '@/types';
import { ref } from 'vue';

const getRef = (options: IntervalOptions) => {
   return ref(new Interval(options));
};

const useInterval = () => ({
   getRef: getRef,
});

export default useInterval;
