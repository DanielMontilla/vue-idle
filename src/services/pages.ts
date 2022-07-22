import { DEF_SAVE_FILE } from '#/data';
import { BarracksData, PagesData, SaveFile, ShopData, StateService } from '@/types';
import { ref, Ref } from 'vue';

/* 🏁 initialization  */
const { pages } = DEF_SAVE_FILE;

/* 💬 Data */
const shop: Ref<ShopData> = ref(pages.shop);

/* state service implementations */
const _key = 'pages';
const setData = (file: SaveFile) => {
   const { pages } = file;

   shop.value = pages.shop;
};
const getData = (): PagesData => ({
   shop: shop.value,
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
