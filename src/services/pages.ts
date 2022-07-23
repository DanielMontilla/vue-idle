import {
   BarracksData,
   PagesData,
   SaveFile,
   ShopData,
   ShopElements,
   StateService,
} from '@/types';
import Interval from '@/classes/Interval';
import { Hero, Socket } from '@/classes/_index';
import { useSave } from '@/services/_index';
import { ref } from 'vue';

/* 💬 Data */
/* >----| 🛒 for shop */
let shop: ShopElements = {} as ShopElements;
/* >----| 🏋️‍♂️ for activities */

/* state service implementations */
const _key = 'pages';

const setData = (file: SaveFile) => {
   const { isDef } = useSave();
   const { pages } = file;

   // yea good luck reading this shit
   shop = {
      barracks: {
         refreshInterval: new Interval(pages.shop.barracks.interval),
         sockets: ref(
            pages.shop.barracks.sockets.map(s =>
               s
                  ? Socket.createRef(s)
                  : isDef
                  ? (() => {
                       let ref = Socket.createRef({ type: 'buy', itemData: null });
                       ref.value.insert(Hero.generateRandom());
                       return ref;
                    })()
                  : Socket.createRef({ type: 'buy', itemData: null })
            )
         ),
      },
   };
};

const getData = (): PagesData => ({
   shop: {
      barracks: {
         interval: shop.barracks.refreshInterval.getData(),
         sockets: shop.barracks.sockets.value.map(s =>
            s.value.item ? s.value.getData() : undefined
         ),
      },
   },
});

/* for type purposes */
let props = {
   shop,
};

const usePages = (): StateService<PagesData> & typeof props => ({
   _key,
   setData,
   getData,
   shop,
});

export default usePages;
