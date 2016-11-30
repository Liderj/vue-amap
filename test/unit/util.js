import Vue from 'vue';
import AMap from './../../src/amap';

Vue.use(AMap);

let id = 0;

const createElm = function() {
  const elm = document.createElement('div');

  elm.id = 'app' + ++id;
  document.body.appendChild(elm);

  return elm;
};

/**
 * 回收 vm
 * @param  {Object} vm
 */
exports.destroyVM = function(vm) {
  vm.destroy && vm.destroy();

  vm.$el &&
  vm.$el.parentNode &&
  vm.$el.parentNode.removeChild(vm.$el);
};

/**
 * 创建一个 Vue 的实例对象
 * @param  {Object|String}  Compo   组件配置，可直接传 template
 * @param  {Boolean=false} mounted 是否添加到 DOM 上
 * @return {Object} vm
 */
exports.createVue = function(Compo, mounted = false) {
  const elm = createElm();

  if (Object.prototype.toString.call(Compo) === '[object String]') {
    Compo = { template: Compo };
  }
  return new Vue(Compo).$mount(mounted === false ? null : elm);
};

/**
 * 创建一个测试组件实例
 * @link http://vuejs.org/guide/unit-testing.html#Writing-Testable-Components
 * @param  {Object}  Compo          - 组件对象
 * @param  {Object}  propsData      - props 数据
 * @param  {Boolean=false} mounted  - 是否添加到 DOM 上
 * @return {Object} vm
 */
exports.createTest = function(Compo, propsData = {}, mounted = false) {
  if (propsData === true || propsData === false) {
    mounted = propsData;
    propsData = {};
  }
  const elm = createElm();
  const Ctor = Vue.extend(Compo);
  return new Ctor({ propsData }).$mount(mounted === false ? null : elm);
};

/**
 * 触发一个事件
 * @param  {MapsEvent} elm
 * @param  {String} name
 * @param  {*} opts
 */
exports.triggerEvent = function(elm, name, ...opts) {
  elm.emit(name);
  return elm;
};

/**
 * 数组转字符串
 * @param  {Array} arr
 * @return {String} str
 */
exports.strSure = function(v) {
  let result = [];
  if (v instanceof Array) {
    // case : Array
    result = v;
  } else if (v.getLng) {
    // case : LngLat
    result = [v.getLng(), v.getLat()];
  } else if (v.getWidth) {
    // case : Size
    result = [v.getWidth(), v.getHeight()];
  } else if (v.getSouthWest) {
    // case: Bounds
    result = [v.getSouthWest(), v.getNorthEast()];
  } else {
    result = [v];
  }
  return result.join('_');
};

/**
 * 日志
 * @param  {String} msg
 * @param  {String} type [success/error/normal]
 */
exports.log = function(msg, type = 'normal') {
  let prefix = '[test]';
  switch (type) {
    case 'success':
      prefix += '[success] ';
      break;
    case 'error':
      prefix += '[error] ';
      break;
    case 'start':
      prefix += '[start] ';
      break;
    case 'end':
      prefix += '[end] ';
      break;
    case 'unkown':
      prefix += '[unkown] ';
      break;
    default:
      prefix += ' ';
  }
  console.log(prefix + msg);
};
