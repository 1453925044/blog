import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './registerServiceWorker'
import handleTemp from './library/factory.js'


// 引入element ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 引入头部文件
import headers from './components/header/index';
Vue.component('headers', headers)

// 引入富文本编辑器
import tinymce from 'tinymce/tinymce'

// import Prism from 'prismjs';
// Prism.highlightAll()


Vue.config.productionTip = false
Vue.prototype.$unit = handleTemp

new Vue({
  router,
  store,
  mounted() {
    document.dispatchEvent(new Event('render-event'))
  }, 
  render: h => h(App)
}).$mount('#app')
