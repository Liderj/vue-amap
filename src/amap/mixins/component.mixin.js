import { Helper, warn } from '../utils';

export default {
  methods: {
    destroy() {
      if (this.$data.$_amap_type === 'amap' && this.$_amap) {
        this.$_amap.destroy();
      }
    },

    _applyGaodeGetter(prop) {
      if (this.$_amap_obj) {
        let fn = this.$_amap_obj['get' + Helper.uppercaseFirst(prop)];
        if (fn) {
          // support getter.like "getCenter"
          return fn.call(this.$_amap_obj, prop);
        } else if (this.$_amap_obj.getStatus) {
          // like "zoomchange", "resizeEnable"
          let status = this.$_amap_obj.getStatus();
          return status[prop];
        } else {
          return '';
        }
      }
    },

    _isReactiveProp(prop) {
      if (this.$_amap_obj) {
        return !!this.$_amap_obj['set' + Helper.uppercaseFirst(prop)];
      }
      return false;
    },

    _applyGaodeSetter(name, value) {
      let propData = '';
      let converter = '';

      propData = (this.converters && (converter = this.converters[name])) ? [converter(value)] : [value];
      if (this.$_amap_obj) {
        let fn = this.$_amap_obj['set' + Helper.uppercaseFirst(name)];
        if (fn) {
          // support setter.like "setCenter"
          return fn.apply(this.$_amap_obj, propData);
        } else if (this.$_amap_obj.setStatus) {
          // like "zoomchange", "resizeEnable"
          let _status = {};
          _status[name] = propData[0];
          this.$_amap_obj.setStatus(_status);
        } else {
          warn(name + ' is not changable');
        }
      }
    },

    _propsConvert(props) {
      let _props = Object.assign({}, props);

      for (let k in this.converters) {
        if (_props[k] == null) {
          delete _props[k];
        } else {
          _props[k] = this.converters[k](_props[k]);
        }
      }

      return _props;
    },

    _isSupportSetMap(o) {
      return !o.setMap;
    },

    _register() {
      let propsData = this._propsConvert(this.$options.propsData);
      // gaode entity
      this.$_amap_obj = this.entity(propsData);

      this._constProps = [];
      this._constPropsMap = new Map();
      this._reactiveProps = [];
      this._reactivePropsMap = new Map();

      this.$options._propKeys.forEach((v) => {
        if (this._isReactiveProp(v)) {
          this._reactiveProps.push(v);
          this._reactivePropsMap.set(v);
        } else {
          this._constProps.push(v);
          this._constPropsMap.set(v);
        }
      });
      console.log('const props:');
      console.log(this._constProps);
      console.log('reactive');
      console.log(this._reactiveProps);

      // add watchers
      for (let k in this.$options.propsData) {
        this.$watch(k, (v) => {
          this._applyGaodeSetter(k, v);
        });
        this._applyGaodeSetter(k, this.$options.propsData[k]);
      }

      // bind user events
      let events = this.$options.propsData.events || {};
      for (let k in events) {
        this.$_amap_obj.on(k, events[k]);
      }

      if (!this._isSupportSetMap(this.$_amap_obj)) {
        this.$_amap_obj.setMap(this.$_amap);
        // bind 'init' event
        let _init = events['init'] || function() {};
        _init(this.$_amap_obj);
      } else {
        // bind 'init' event
        this.$_amap_obj.on('complete', function() {
          let _init = events['init'] || function() {};
          _init(this);
        });
      }

      // excute interceptors
      if (this.interceptors) {
        for (let k in this.interceptors) {
          if (this.$options.propsData[k] !== undefined) {
            this.interceptors[k](this.$_amap_obj, this.$options.propsData[k]);
          }
        }
      }
      // console.log(this);
    }
  },

  created() {
    this._amap_props = this.props || new Map();
    this.$_amap = this.$parent && this.$parent.$_amap ? this.$parent.$_amap : '';
  },

  destroyed() {
    if (this.$data.$_amap_type === 'amap' && this.$_amap) {
      this.$_amap.destroy();
    }
  },

  mounted() {
    if (this.$_amap) {
      this._register();
    } else {
      this.$on('amap:ready', (amap) => {
        this.$_amap = amap;
        this._register();
      });
    }
  }
};
