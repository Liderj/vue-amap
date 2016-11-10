<template lang="html">
  <section class="home-page">
    <section class="page-header-bg">
    </section>
    <section class="page-header">
      <div class="project-name">vue-amap</div>
      <p class="sub">
        基于Vue 2.0 和高德地图的地图组件库
      </p>
      <h2 class="project-tagline"></h2>
      <a href="https://github.com/ElemeFE/vue-amap" class="btn">GitHub</a>
      <a href="/#/docs/" class="btn">文档</a>
    </section>
    <canvas id="meteor"></canvas>

    <section class="main-content">
      <h3 class="slogan">
        “ vue-amap 只是为了让操作地图更简单点，从此，你可以这样写地图。 ”
      </h3>

      <pre><code class="language-javascript">&lt;amap id=<span class="hljs-string">"amap"</span> :zoom=<span class="hljs-string">"zoom"</span>&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">amap-marker</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"marker in markers"</span> <span class="hljs-attr">:position</span>=<span class="hljs-string">"marker.position"</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">amap-marker</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">amap</span>&gt;</span></span></code>
      </pre>
    </section>
  </section>
</template>
<script>
export default {
  name: 'home',
  mounted() {
    setTimeout(function() {
      if (window.meteor) {
        window.meteor();
      }
    }, 1500);
  }
};
</script>
<style lang="scss">
  .home-page {
    a {
        text-decoration: none;
        color: #42b983
    }

    .slogan {
      text-align: center;
      margin: 70px 0 !important;
      font-size: 24px;
    }

    pre {
      line-height: 30px;
      padding-bottom: 0px;

      * {
        font-size: 20px;
      }
    }

    .main-content {
      width: 900px;
      margin: 0 auto;
      line-height: 30px;
      margin-top: 380px;

      .h1, h2, h3, h4, h5, h6 {
        margin-bottom: 1rem;
        font-weight: normal;
        color: #159957;
      }
    }

    #meteor, .page-header-bg, .page-header {
      position: absolute;
      top: 0;
      width: 100%;
      height: 321px;
    }

    .page-header-bg {
      background-color: #159957;
      background-image: linear-gradient(120deg, #155799, #159957);
      left: 0;
      z-index: 9;
    }

    #meteor {
      left: 50%;
      width: 900px;
      margin-left: -450px;
      z-index: 10;
    }

    .page-header {
      color: #fff;
      text-align: center;
      padding: 55px 0;
      z-index: 11;
      left: 0;

      .sub {
        color: #afafaf;
        margin: 20px 0 60px 0;
      }

      .project-name {
        font-size: 60px;
        font-family: cursive
      }

      .btn {
        display: inline-block;
        margin-bottom: 1rem;
        color: rgba(255, 255, 255, 0.7);
        background-color: rgba(255, 255, 255, 0.08);
        border-color: rgba(255, 255, 255, 0.2);
        border-style: solid;
        border-width: 1px;
        border-radius: 0.3rem;
        transition: color 0.2s, background-color 0.2s, border-color 0.2s;
        padding: 0.75rem 1rem;
        margin: 0 10px;

        &:hover {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          background-color: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.3); }
        }
      }
  }
</style>
