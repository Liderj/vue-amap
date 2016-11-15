# vue-amap

vue-amap是一款基于Vue2.0，高德地图V1.3.21，开发的地图框架。

### 快速安装

```
npm install vue-amap --save
```

### 引入vue-amap

```javascript
import AMap from 'vue-amap';
Vue.use(AMap);

AMap.init({
  // 高德地图的key
  key: 'your key',
  // 高德的插件
  plugin: [...]
});
```
