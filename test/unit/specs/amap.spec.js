import Vue from 'vue';
import AMap from '../../../src/amap';
import { createVue, strSure, destroyVM, log } from '../util';

Vue.use(AMap);
AMap.init({
  key: '28966b6be8e4fa0e4c4f4c9b4bf8d3ce'
});

describe('AMap Test', () => {
  let vm = '';
  let template = `
        <amap id="amap"
        :animateEnable="animateEnable"
        :isHotspot="isHotspot"
        :rotateEnable="rotateEnable"
        :resizeEnable="resizeEnable"
        :showIndoorMap="showIndoorMap"
        :expandZoomRange="expandZoomRange"
        :dragEnable="dragEnable"
        :zoomEnable="zoomEnable"
        :doubleClickZoom="doubleClickZoom"
        :keyboardEnable="keyboardEnable"
        :jogEnable="jogEnable"
        :scrollWheel="scrollWheel"
        :touchZoom="touchZoom"
        :center="center"
        :lang="lang"
        :mapStyle="mapStyle"
        :events="events"
        >
        </amap>
  `;

  let config = {
    animateEnable: true,
    isHotspot: true,
    rotateEnable: true,
    resizeEnable: true,
    showIndoorMap: true,
    expandZoomRange: true,
    dragEnable: true,
    zoomEnable: true,
    doubleClickZoom: true,
    keyboardEnable: true,
    jogEnable: true,
    scrollWheel: true,
    touchZoom: true,
    center: [121.123, 31.123],
    lang: 'zh_cn',
    mapStyle: 'normal'
  };

  afterEach(() => {
    destroyVM(vm);
  });

  // AMap init test
  it('AMap init test', done => {
    log('AMap init test', 'start');

    vm = createVue({
      template: template,
      data() {
        return {
          ...config,
          events: {
            complete() {
              let vCompo = vm.$children[0];
              let obj = vCompo.$_amap;
              // init success
              expect(typeof obj.getCenter).to.equal('function');

              // config success
              for (let [k, v] of Object.entries(vCompo.$options.propsData)) {
                let _v = vCompo._applyGaodeGetter.call(vCompo, k);
                if (_v) {
                  log(`prop = ${ k }, value = ${ v } is checking.`, 'success');
                  expect(strSure(_v)).to.equal(strSure(v));
                } else {
                  log(`prop = ${ k }, value = ${ v } is checking.`, 'unkown');
                }
              }
              done();

              log('AMap init test', 'end');
            }
          }
        };
      }
    }, true);
  });

  // AMap setter test
  it('AMap set test', done => {
    log('AMap set test', 'start');
    vm = createVue({
      template: template,
      data() {
        return {
          ...config,
          events: {
            complete() {
              this.animateEnable = false;
              this.isHotspot = false;
              this.rotateEnable = false;
              this.resizeEnable = false;
              this.showIndoorMap = false;
              this.expandZoomRange = false;
              this.dragEnable = false;
              this.zoomEnable = false;
              this.doubleClickZoom = false;
              this.keyboardEnable = false;
              this.jogEnable = false;
              this.scrollWheel = false;
              this.touchZoom = false;
              this.center = [121.234, 31.234];
              this.lang = 'en';
              this.mapStyle = 'dark';

              Vue.nextTick(() => {
                // set success
                let vCompo = vm.$children[0];
                for (let [k, v] of Object.entries(config)) {

                  log(`key = ${ k }, value = ${ v } start checking.`);
                  let _v = vCompo._applyGaodeGetter.call(vCompo, k);
                  if (_v != null) {
                    log('', 'success');
                    expect(strSure(_v)).to.equal(strSure(v));
                  } else {
                    log('', 'unkown');
                  }
                }
                done();
                log('AMap set test', 'end');
              });
            }
          }
        };
      }
    }, true);
  });

  // AMap events test
  it('AMap events test', done => {
    log('AMap events test', 'start');

    const events = [
      'click',
      'dblclick',
      'mapmove',
      'hotspotclick',
      'hotspotover',
      'hotspotout',
      'movestart',
      'moveend',
      'zoomchange',
      'zoomstart',
      'zoomend',
      'mousemove',
      'mousewheel',
      'mouseover',
      'mouseout',
      'mouseup',
      'mousedown',
      'rightclick',
      'dragstart',
      'dragging',
      'dragend',
      'resize',
      'touchstart',
      'touchmove',
      'touchend'
    ];

    let eventsConfig = {};
    let eventsCbSuccessCount = 0;

    // register events
    events.forEach(event => {
      eventsConfig[event] = () => {
        eventsCbSuccessCount++;
        log(`emit ${ event }`);
      };
    });

    eventsConfig['complete'] = () => {
      eventsCbSuccessCount++;
      log('emit complete');

      let vCompo = vm.$children[0];
      let obj = vCompo.$_amap;

      // emit events
      events.forEach(event => {
        obj.emit(event);
      });

      expect(eventsCbSuccessCount).to.equal(events.length + 1);
      done();
      log('AMap events test', 'end');
    };

    vm = createVue({
      template: `
            <amap id="amap"
            :events="events"
            >
            </amap>
      `,
      data() {
        return {
          events: eventsConfig
        };
      }
    }, true);
  });
});
