<template>
  <div id="app">
    <amap id="amap" :zoom="zoom">
      <amap-marker v-for="marker in markers" :position="marker.position" :content="marker.content" :visible="marker.visible" :angle="marker.angle" :animation="marker.animation" :events="marker.events"></amap-marker>
    </amap>
    <button @click="action"> action </button>
    <button @click="push"> push </button>
  </div>
</template>

<script>
import AMap from './amap';

export default {
  name: 'app',
  components: {AMap},
  data () {
    return {
      markers: [{
        position: [121.5273285, 31.21515044],
        content: 'old',
        animation: 'AMAP_ANIMATION_NONE',
        angle: 0
      }],
      zoom: 3,
      baseAngle: 5
    }
  },
  methods: {
    action () {
      // this.markers[0].position = [parseFloat(this.markers[0].position[0]) + 0.1, 31.21515044]
      // this.markers[0].content += 'content'
      this.markers[0].angle++;

      this.markers[0].animation = 'AMAP_ANIMATION_BOUNCE';
    },

    push () {
      this.baseAngle += 30

      this.markers.push({
        position: [121.52732849, 31.21515044],
        content: 'new',
        angle: this.baseAngle,
        visible: true,
        events: {
          click (e) {
            console.log(e);
          }
        }
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
