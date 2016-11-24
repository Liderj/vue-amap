<template>
  <div class="ground">
    amap-groundimage
  </div>
</template>

<script>
/* global AMap */
import ComponentMixin from '../mixins/component.mixin';
import { Gaode } from '../utils';

export default {
  mixins: [ComponentMixin],
  props: ['clickable',
    'opacity',
    'url',
    'bounds',
    'show',
    'events'
  ],
  data() {
    return {
      converters: {},
      interceptors: {
        show(o, v) {
          (v ? o.show() : o.hide());
        }
      }
    };
  },

  methods: {
    entity(options) {
      return new AMap.GroundImage(options.url, Gaode.boundsFactory(options.bounds), options);
    }
  }
};
</script>
