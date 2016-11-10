export default [
  {
    zh: '介绍',
    en: 'introduction',
    children: [
      {
        component: require('./introduction.md'),
        en: 'Introduction',
        zh: '介绍'
      }
    ]
  },
  {
    zh: '覆盖物',
    en: 'mask',
    children: [
      {
        component: require('./map.md'),
        en: 'Map',
        zh: '地图'
      },
      {
        component: require('./marker.md'),
        en: 'Marker',
        zh: '点坐标'
      },
      {
        component: require('./polyline.md'),
        en: 'Polyline',
        zh: '折线'
      },
      {
        component: require('./polygon.md'),
        en: 'Polygon',
        zh: '多边形'
      },
      {
        component: require('./circle.md'),
        en: 'Circle',
        zh: '圆'
      },
      {
        component: require('./groundimage.md'),
        en: 'GroundImage',
        zh: '图片覆盖物'
      }
    ]
  },
  {
    zh: '示例中心',
    en: 'examples',
    children: [
      {
        component: require('./examples/map.md'),
        en: 'map examples',
        zh: '地图示例'
      },
      {
        component: require('./examples/marker.md'),
        en: 'marker examples',
        zh: '点坐标示例'
      }
    ]
  }
];
