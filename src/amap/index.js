import Vue from 'vue';

// components
import AMap from './components/amap';
import Marker from './components/marker';
import Polyline from './components/polyline';
import Polygon from './components/polygon';
import Circle from './components/circle';
import Groundimage from './components/groundimage';

let components = [{
  tag: 'amap',
  compo: AMap
}, {
  tag: 'amap-marker',
  compo: Marker
}, {
  tag: 'amap-polyline',
  compo: Polyline
}, {
  tag: 'amap-polygon',
  compo: Polygon
}, {
  tag: 'amap-circle',
  compo: Circle
}, {
  tag: 'amap-groundimage',
  compo: Groundimage
}];

components.forEach((v) => {
  Vue.component(v.tag, v.compo);
});

let VueAMap = {
  init(options) {
    Vue.config.amap = Object.assign({}, options);
  }
};

VueAMap.install = (Vue) => {
  if (VueAMap.installed) return;
  Vue.config.optionMergeStrategies.deferredReady = Vue.config.optionMergeStrategies.created;
};

export default VueAMap;
