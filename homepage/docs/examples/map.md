# 地图

---

## 模板

```javascript
<div id="demoMap1" class="demo-component">
  <amap id="demo-map-1" :zoom="zoom" :dragEnable="dragEnable" :center="center">
  </amap>
  <div class="action-list">
    <p>
      <button @click="changeZoom()">change zoom</button>
    </p>
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
      zoom: 14,
      dragEnable: true,
      center: [121.5273285, 31.21515044]
    }
  },
  methods: {
    changeZoom () {
      this.zoom++
    }
  }
}
```

<div class="map-present">
  <div id="demoMap1" class="demo-component">
    <amap id="demo-map-1" :zoom="zoom">
    </amap>
    <div class="action-list">
      <p>
        <button @click="changeZoom()">change zoom</button>
      </p>
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
        dragEnable: true,
        center: [121.5273285, 31.21515044]
      }
    },
    methods: {
      changeZoom () {
        this.zoom++
      }
    }
  }
</script>
