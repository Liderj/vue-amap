<template>
  <div class="polyline">
    amap-polyline
  </div>
</template>

<script>
/* global AMap */
import ComponentMixin from '../mixins/component.mixin';

export default {
  mixins: [ComponentMixin],
  props: ['zIndex',
    'bubble',
    'geodesic',
    'isOutline',
    'outlineColor',
    'path',
    'strokeColor',
    'strokeOpacity',
    'strokeWeight',
    'strokeStyle',
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
      return new AMap.Polyline(options);
    }
  }
};
</script>
