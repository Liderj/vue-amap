import { Helper, warn } from '../utils';

export default {
  methods: {
    _isConstProp(prop) {
      if (this.$_amap_obj) {
        return !!this.$_amap_obj['set' + Helper.uppercaseFirst(prop)];
      }
      return false;
    },

    _findDirtyPromps() {
      let dirtyProps = [];
      let _newProps = this.$options.propsData;

      for (let k in _newProps) {
        let prop = this._amap_props.get(k);

        if (!Helper.equals(prop, _newProps[k])) {
          dirtyProps.push({
            name: k,
            value: _newProps[k]
          });
          this._amap_props.set(k, _newProps[k]);
        }
      }

      return dirtyProps;
    },

    applyGaodeSetter(name, value) {
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

    _reRender() {
      let dirtyProps = this._findDirtyPromps();
      dirtyProps.forEach((v) => {
        this.applyGaodeSetter(v.name, v.value);
      });
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

    _register() {
      let propsData = this._propsConvert(this.$options.propsData);
      // gaode entity
      this.$_amap_obj = this.entity(propsData);

      // add watchers
      for (let k in this.$options.propsData) {
        this.$watch(k, (v) => {
          this.applyGaodeSetter(k, v);
        });
        this.applyGaodeSetter(k, this.$options.propsData[k]);
      }

      // bind user events
      let events = this.$options.propsData.events || {};
      for (let k in events) {
        this.$_amap_obj.on(k, events[k]);
      }

      if (this.$_amap_obj.setMap) {
        this.$_amap_obj.setMap(this.$_amap);
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
