var webpackConfig = require('../../build/cooking.test.js');

// dont need entry config
delete webpackConfig.entry;

module.exports = function(config) {
  config.set({
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.
    browsers: ['Chrome', 'Chrome_without_security'],
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['spec', 'coverage'],
    files: [
      './../../node_modules/phantomjs-polyfill-object-assign/object-assign-polyfill.js',
      './index.js'],
    webpack: webpackConfig,
    client: {
      mocha: {
        timeout: 5000
      }
    },
    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    },
    customLaunchers: {
      Chrome_without_security: {
        base: 'Chrome',
        flags: ['--disable-web-security']
      }
    }
  });
};
