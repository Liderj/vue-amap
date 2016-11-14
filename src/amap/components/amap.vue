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
    'events'
  ],
  mixins: [ComponentMixin],

  methods: {
    _bindMap() {
      let propsData = this.$options.propsData;
      propsData = this._propsConvert(propsData);
      this.$_amap_obj = this.$_amap = new AMap.Map(this.$options.propsData.id, propsData);

      this.$children.forEach((v) => {
        v.$emit('amap:ready', this.$_amap);
      });

      this.$emit('amap:ready', this.$_amap);
    },

    entity() {
      return this.$_amap;
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
