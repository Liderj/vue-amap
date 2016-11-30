import Vue from 'vue';
import AMap from '../../../src/amap';
import { createVue, strSure, destroyVM, log } from '../util';

Vue.use(AMap);
AMap.init({
  key: '28966b6be8e4fa0e4c4f4c9b4bf8d3ce'
});

describe('Marker Test', () => {
  let vm = '';
  let template = `
        <amap id="amap"
        :center="center"
        :events="events"
        >
        <amap-marker
        v-for="marker in markers"
        :topWhenClick="marker.topWhenClick"
        :bubble="marker.bubble"
        :visible="marker.visible"
        :zIndex="marker.zIndex"
        :autoRotation="marker.autoRotation"
        :position="marker.position"
        :offset="marker.offset"
        :icon="marker.icon"
        :content="marker.content"
        :draggable="marker.draggable"
        :raiseOnDrag="marker.raiseOnDrag"
        :cursor="marker.cursor"
        :angle="marker.angle"
        :animation="marker.animation"
        :title="marker.title"
        :clickable="marker.clickable"
        :label="marker.label"
        >
        </amap-marker>
        </amap>
  `;

  let config = {
    center: [121.527, 31.215],
    markers: [
      {
        topWhenClick: true,
        bubble: true,
        visible: true,
        zIndex: 10,
        autoRotation: true,
        position: [121.527, 31.215],
        offset: [0, 0],
        icon: 'before_icon',
        content: 'marker',
        draggable: true,
        raiseOnDrag: true,
        angle: 0,
        animation: 'AMAP_ANIMATION_NONE',
        title: 'default title',
        clickable: true,
        label: 'default label'
      }
    ]
  };

  afterEach(() => {
    destroyVM(vm);
  });

  // AMap init test
  it('Marker init test', done => {
    log('Marker init test', 'start');

    vm = createVue({
      template: template,
      data() {
        return {
          ...config,
          events: {
            complete() {
              let vCompo = vm.$children[0].$children[0];
              let obj = vCompo.$_amap_obj;

              expect(typeof obj.markOnAMAP).to.equal('function');

              // config success
              // for (let [k, v] of Object.entries(vCompo.$options.propsData)) {
              //   let _v = vCompo._applyGaodeGetter.call(vCompo, k);
              //   if (_v) {
              //     log(`prop = ${ k }, value = ${ v } is checking.`, 'success');
              //     expect(strSure(_v)).to.equal(strSure(v));
              //   } else {
              //     log(`prop = ${ k }, value = ${ v } is checking.`, 'unkown');
              //   }
              // }
              done();

              log('Marker init test', 'end');
            }
          }
        };
      }
    }, true);
  });

  // AMap setter test
  it('Marker set test', done => {
    log('Marker set test', 'start');
    vm = createVue({
      template: template,
      data() {
        return {
          ...config,
          events: {
            complete() {
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
              log('Marker set test', 'end');
            }
          }
        };
      }
    }, true);
  });

  // AMap events test
  it('Marker events test', done => {
    log('Marker events test', 'start');

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
      log('Marker events test', 'end');
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
