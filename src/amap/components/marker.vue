<template>
  <div class="marker"
    :position="position"
    :content="content"
    :offset="offset"
    :icon="icon"
    :topWhenClick="topWhenClick"
    :bubble="bubble"
    :draggable="draggable"
    :raiseOnDrag="raiseOnDrag"
    :cursor="cursor"
    :visible="visible"
    :zIndex="zIndex"
    :angle="angle"
    :autoRotation="autoRotation"
    :animation="animation"
    :shadow="shadow"
    :title="title"
    :clickable="clickable"
    :shape="shape"
    :label="label">
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
    'shadow',
    'title',
    'clickable',
    'shape',
    'label',
    'events'
  ],
  data() {
    return {
      converters: {
        position(v) {
          return Gaode.lngLatFactory(v);
        },
        offset(v) {
          return Gaode.pixelFactory(v);
        },
        shadow(v) {
          return new AMap.Icon(v);
        },
        shape(v) {
          return new AMap.MarkerShape(v);
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
