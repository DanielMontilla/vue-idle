import { useInit } from '@/services/_index';
import { createApp } from 'vue';
import App from '@/App.vue';

const { windowInit } = useInit();
windowInit();

createApp(App).mount('#app');
