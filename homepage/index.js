import Vue from 'vue';
import router from './router';
import AMap from '../src/amap';
import './assets/script/meteor.js';

Vue.use(AMap);
AMap.init({
  key: '28966b6be8e4fa0e4c4f4c9b4bf8d3ce',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar']
});

import App from './App.vue';

const app = new Vue({  // eslint-disable-line
  router,
  render: h => h(App)
}).$mount('#app');
