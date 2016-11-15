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
    'events'
  ],
  data() {
    return {
      converters: {}
    };
  },

  methods: {
    entity(options) {
      return new AMap.Circle(options);
    }
  }
};
</script>
