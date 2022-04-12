import { createApp } from 'vue';
import { createPinia } from 'pinia';
// @ts-ignore
import App from '@/App.vue';

let app = createApp(App);
app.use(createPinia());
app.mount('#app');
