import './assets/main.css';
import 'vue-loading-overlay/dist/css/index.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { VueQueryPlugin, type VueQueryPluginOptions } from '@tanstack/vue-query';

import App from '@/App.vue';
import router from '@/router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
      },
    },
  },
};

app.use(VueQueryPlugin, vueQueryPluginOptions);

app.mount('#app');
