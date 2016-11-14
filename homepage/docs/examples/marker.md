# 地图

---

## 模板

```javascript
<div class="map-present">
  <div id="demoMap1" class="demo-component">
    <amap id="demo-map-1" :zoom="zoom" :center="center">
      <amap-marker v-for="marker in markers" :position="marker.position"></amap-marker>
    </amap>
    <div class="action-list">
      <button @click="addNewMarker()">add new marker</button>
      <button @click="allMarkerMove()">all marker move</button>
    </div>
  </div>
</div>
```

## 示例代码
```javascript
import Vue from 'vue'

export default {
  name: 'demoMap1',
  data () {
    return {
      zoom: 13,
      center: [121.5273285, 31.21515044],
      markers: [
        {
          position: [121.5273285, 31.21515044]
        }
      ]
    }
  },
  methods: {
    addNewMarker () {
      let newMarkers = [
        {
          position: [121.4973010000, 31.2162610000]
        },
        {
          position: [121.5019360000, 31.2178020000]
        }
      ];

      newMarkers.forEach((v) => {
          this.markers.push(v)
      })
    },

    allMarkerMove () {
      window.setInterval(() => {
        this.markers.forEach((v) => {
          v.position = [v.position[0] + 0.001, v.position[1]]
          })
      }, 1000)
    }
  }
}
```

<div class="map-present">
  <div id="demoMap1" class="demo-component">
    <amap id="demo-map-1" :zoom="zoom" :center="center">
      <amap-marker v-for="marker in markers" :position="marker.position"></amap-marker>
    </amap>
    <div class="action-list">
      <button @click="addNewMarker()">add new marker</button>
      <button @click="allMarkerMove()">all marker move</button>
    </div>
  </div>
</div>

<script>
  import Vue from 'vue'

  export default {
    name: 'demoMap1',
    data () {
      return {
        zoom: 13,
        center: [121.5273285, 31.21515044],
        markers: [
          {
            position: [121.5273285, 31.21515044]
          }
        ]
      }
    },
    methods: {
      addNewMarker () {
        let newMarkers = [
          {
            position: [121.4973010000, 31.2162610000]
          },
          {
            position: [121.5019360000, 31.2178020000]
          }
        ];

        newMarkers.forEach((v) => {
            this.markers.push(v)
        })
      },

      allMarkerMove () {
        window.setInterval(() => {
          this.markers.forEach((v) => {
            v.position = [v.position[0] + 0.001, v.position[1]]
            })
        }, 1000)
      }
    }
  }
</script>
