import Vue from 'vue';

// components
import AMap from './components/amap';
import Marker from './components/marker';

Vue.component('amap', AMap);
Vue.component('amap-marker', Marker);

let VueAMap = {
};

VueAMap.install = (Vue) => {
  if (VueAMap.installed) return;
  Vue.config.optionMergeStrategies.deferredReady = Vue.config.optionMergeStrategies.created;
};

export default VueAMap;
