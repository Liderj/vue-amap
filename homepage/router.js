import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Docs from './pages/Docs';
import Home from './pages/Home';
import docs from './docs';
import enToSnake from './utils/enToSnake';

let children = [];

docs.map(v => {
  if (v.children && v.children.length > 0) {
    v.children.map(v1 => {
      children.push({
        path: enToSnake(v1.en),
        component: v1.component
      });
      return v1;
    });
  }
  return v;
});

export default new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes: [
    {
      path: '/docs',
      component: Docs,
      children: children
    },
    {
      path: '/',
      component: Home
    },
    {
      path: '/docs/',
      redirect: '/docs/introduction'
    }
  ]
});
