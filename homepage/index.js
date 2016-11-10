import Vue from 'vue';
import router from './router';
import AMap from '../src/amap';
import './assets/script/meteor.js';

Vue.use(AMap);

import App from './App.vue';

const app = new Vue({  // eslint-disable-line
  router,
  render: h => h(App)
}).$mount('#app');
