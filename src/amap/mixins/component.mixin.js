import { Helper, warn } from '../utils';

export default {
  methods: {
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
          return fn.apply(this.$_amap_obj, propData);
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

    _isMap(o) {
      return !o.setMap;
    },

    _register() {
      let propsData = this._propsConvert(this.$options.propsData);
      // gaode entity
      this.$_amap_obj = this.entity(propsData);

      let _constProps = [];
      let _reactiveProps = [];

      this.$options._propKeys.forEach((v) => {
        if (this._isReactiveProp(v)) {
          _reactiveProps.push(v);
        } else {
          _constProps.push(v);
        }
      });
      console.log('const props:');
      console.log(_constProps);
      console.log('reactive');
      console.log(_reactiveProps);

      // add watchers
      for (let k in this.$options.propsData) {
        if (this._isReactiveProp(k)) {
          this.$watch(k, (v) => {
            this._applyGaodeSetter(k, v);
          });
          this._applyGaodeSetter(k, this.$options.propsData[k]);
        }
      }

      // bind user events
      let events = this.$options.propsData.events || {};
      for (let k in events) {
        this.$_amap_obj.on(k, events[k]);
      }

      if (!this._isMap(this.$_amap_obj)) {
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
    }
  },

  created() {
    this._amap_props = this.props || new Map();
    this.$_amap = this.$parent && this.$parent.$_amap ? this.$parent.$_amap : '';
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
