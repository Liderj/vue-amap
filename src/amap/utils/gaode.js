/* global AMap */
const DEFAULT_AMAP_CONFIG = {
  key: null,
  v: 1.3,
  protocol: 'https',
  hostAndPath: 'webapi.amap.com/maps',
  plugin: [],
  callback: 'amapInitCallback'
};

import Vue from 'vue';

export default {
  load(config) {
    if (this._promise) return this._promise;
    this._config = Object.assign({}, DEFAULT_AMAP_CONFIG, Vue.config.amap);

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.src = this._getSrc();

    this._promise = new Promise((resolve, reject) => {
      window['amapInitCallback'] = () => {
        console.log('amap has loaded');
        return resolve();
      };
      script.onerror = error => reject(error);
    });
    document.head.appendChild(script);
    return this._promise;
  },

  _getSrc() {
    const queryParams = this._config;
    const paramKeys = ['v', 'key', 'plugin', 'callback'];
    const params = Object.keys(queryParams)
                         .filter(k => paramKeys.indexOf(k) !== -1)
                         .filter(k => queryParams[k] != null)
                         .filter(k => {
                           return !Array.isArray(queryParams[k]) ||
                                (Array.isArray(queryParams[k]) && queryParams[k].length > 0);
                         })
                         .map(k => {
                           let v = queryParams[k];
                           if (Array.isArray(v)) return {key: k, value: v.join(',')};
                           return {key: k, value: v};
                         })
                         .map(entry => `${entry.key}=${entry.value}`)
                         .join('&');
    return `${this._config.protocol}://${this._config.hostAndPath}?${params}`;
  },

  lngLatFactory(v) {
    return new AMap.LngLat(v[0], v[1]);
  },

  sizeFactory(v) {
    return new AMap.Size(v[0], v[1]);
  },

  pixelFactory(v) {
    return new AMap.Pixel(v[0], v[1]);
  },

  boundsFactory(v) {
    return new AMap.Bounds(this.lngLatFactory([v[0][0], v[0][1]]), this.lngLatFactory([v[1][0], v[1][1]]));
  }
};
