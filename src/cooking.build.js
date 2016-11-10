let cooking = require('cooking');

cooking.set({
  entry: './amap/index.js',
  dist: './publish',
  extends: ['vue2'],
  sourceMap: true,
  clean: true
});
module.exports = cooking.resolve();
