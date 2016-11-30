<template>
  <div class="vue-amap">
    <div class="amap-core" :id="id"><div/>
    <div class="amap-data">
      <slot></slot>
    </div>
  </div>
</template>

<script>
/* global AMap */
import { Gaode } from '../utils';
import ComponentMixin from '../mixins/component.mixin';

export default {
  name: 'amap',
  props: [
    'id',
    'zoom',
    'center',
    'labelzIndex',
    'zooms',
    'lang',
    'cursor',
    'animateEnable',
    'isHotspot',
    'rotateEnable',
    'resizeEnable',
    'showIndoorMap',
    'expandZoomRange',
    'dragEnable',
    'zoomEnable',
    'doubleClickZoom',
    'keyboardEnable',
    'jogEnable',
    'scrollWheel',
    'touchZoom',
    'mapStyle',
    'events',
    'plugins'
  ],
  mixins: [ComponentMixin],

  data() {
    return {
      $_amap_type: 'amap'
    };
  },

  methods: {
    _bindMap() {
      let propsData = this.$options.propsData;
      propsData = this._propsConvert(propsData);
      this.$_amap_obj = this.$_amap = new AMap.Map(this.$options.propsData.id, propsData);

      // setup plugins
      if (propsData.plugins) {
        this._setupPlugins(propsData.plugins);
      }

      // broadcast event 'ready'
      this.$children.forEach((v) => {
        v.$emit('amap:ready', this.$_amap);
      });

      this.$emit('amap:ready', this.$_amap);
    },

    entity() {
      return this.$_amap;
    },

    _setupPlugins(plugins = []) {
      plugins.forEach((plugin) => {
        switch (plugin) {
          // 地图类型插件
          case 'AMap.MapType': {
            this.$_amap_obj.plugin([plugin], () => {
              let type = new AMap.MapType({
                // 使用2D地图
                defaultType: 0
              });
              this.$_amap_obj.addControl(type);
            });
            break;
          }
          // 地图鹰眼插件
          case 'AMap.OverView': {
            this.$_amap_obj.plugin([plugin], () => {
              let view = new AMap.OverView();
              this.$_amap_obj.addControl(view);
            });
            break;
          }
          // 比例尺插件
          case 'AMap.Scale': {
            this.$_amap_obj.plugin([plugin], () => {
              let scale = new AMap.Scale();
              this.$_amap_obj.addControl(scale);
            });
            break;
          }
          // 比例尺插件
          case 'AMap.ToolBar': {
            this.$_amap_obj.plugin([plugin], () => {
              let tool = new AMap.ToolBar();
              this.$_amap_obj.addControl(tool);
            });
            break;
          }
        }
      });
    }
  },

  created() {
    console.log('component created');
  },

  updated() {
    console.log('amap updated');
  },

  mounted() {
    Gaode.load().then(() => {
      this._bindMap();
    });
  }
};
</script>

<style>
.vue-amap, .amap-core{
  width: 100%;
  height: 100%;
}

.amap-data{
  display: none
}

.amap-t{
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999999;
}
</style>
