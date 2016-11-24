<template>
  <div class="marker">
    amap-marker
  </div>
</template>

<script>
/* global AMap */
import ComponentMixin from '../mixins/component.mixin';
import {Gaode} from '../utils';

export default {
  mixins: [ComponentMixin],
  props: ['position',
    'content',
    'offset',
    'icon',
    'topWhenClick',
    'bubble',
    'draggable',
    'raiseOnDrag',
    'cursor',
    'visible',
    'zIndex',
    'angle',
    'autoRotation',
    'animation',
    'title',
    'clickable',
    'shape',
    'label',
    'show',
    'events'
  ],
  data() {
    return {
      converters: {
        offset(v) {
          return Gaode.pixelFactory(v);
        },
        shadow(v) {
          return new AMap.Icon(v);
        },
        shape(v) {
          return new AMap.MarkerShape(v);
        }
      },
      interceptors: {
        show(o, v) {
          (v ? o.show() : o.hide());
        }
      }
    };
  },

  methods: {
    entity(options) {
      return new AMap.Marker(options);
    }
  }
};
</script>
