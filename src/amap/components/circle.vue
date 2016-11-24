<template>
  <div class="circle">
    amap-circle
  </div>
</template>

<script>
/* global AMap */
import ComponentMixin from '../mixins/component.mixin';

export default {
  mixins: [ComponentMixin],
  props: ['zIndex',
    'center',
    'bubble',
    'radius',
    'strokeColor',
    'strokeOpacity',
    'strokeWeight',
    'fillColor',
    'fillOpacity',
    'strokeStyle',
    'extData',
    'strokeDasharray',
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
      return new AMap.Circle(options);
    }
  }
};
</script>
