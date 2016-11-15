<template>
  <div class="polygon">
    amap-polygon
  </div>
</template>

<script>
/* global AMap */
import ComponentMixin from '../mixins/component.mixin';

export default {
  mixins: [ComponentMixin],
  props: ['map',
    'zIndex',
    'path',
    'bubble',
    'strokeColor',
    'strokeOpacity',
    'strokeWeight',
    'fillColor',
    'fillOpacity',
    'extData',
    'strokeStyle',
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
      return new AMap.Polygon(options);
    }
  }
};
</script>
