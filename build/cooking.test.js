const cooking = require('cooking');

cooking.set({
  entry: './src/amap/index.js',
  extends: ['vue2', 'lint'],
  hash: true,
  sourceMap: '#inline-source-map',
  // https://github.com/vuejs-templates/webpack/issues/215
  alias: {
    vue: 'vue/dist/vue.js'
  }
});
module.exports = cooking.resolve();
