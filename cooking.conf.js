const cooking = require('cooking');
const markdownIt = require('markdown-it')({
  html: true,
  breaks: true
});

cooking.set({
  entry: ['./homepage/index.js'],
  template: './homepage/index.html',
  dist: './dist',
  devServer: {
    port: 4200,
    publicPath: '/'
  },
  extends: ['vue2', 'lint'],
  clean: true,
  hash: true,
  sourceMap: true,
  publicPath: './'
});

cooking.add('loader.md', {
  test: /\.md$/,
  loader: 'vue-markdown-loader'
});

cooking.add('vueMarkdown', markdownIt);

module.exports = cooking.resolve();
