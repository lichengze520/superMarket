import Vue from 'vue'
import App from './App.vue'
import router from './router'
/* 引入element-ui */
import ElementUI from 'element-ui' // 组件
import 'element-ui/lib/theme-chalk/index.css' // 样式
/* 引入重置样式 */
import './assets/css/rest.css'
/* 注册 */
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')