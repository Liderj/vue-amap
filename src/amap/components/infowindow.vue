<template>
  <div class="info-window">
    info-window
  </div>
</template>

<script>
/* global AMap */
import ComponentMixin from '../mixins/component.mixin';
import {Gaode} from '../utils';

export default {
  mixins: [ComponentMixin],
  props: ['content',
    'position',
    'isCustom',
    'autoMove',
    'closeWhenClickMap',
    'content',
    'size',
    'offset',
    'showShadow',
    'open',
    'events'
  ],
  data() {
    return {
      converters: {
        offset(v) {
          return Gaode.pixelFactory(v);
        }
      },
      interceptors: {
        open(o, v) {
          (v ? o.open(o.$__amap) : o.close());
        }
      }
    };
  },

  methods: {
    entity(options) {
      return new AMap.InfoWindow(options);
    }
  }
};
</script>
