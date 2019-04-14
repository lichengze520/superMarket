import Vue from 'vue'
import App from './App.vue'
import router from './router'

//引入local文件
import local from '@/utils/local'



// 引入request.js
import request from './utils/request'
// 挂载原型上
Vue.prototype.request = request;

/* 引入element-ui */
import ElementUI from 'element-ui' // 组件
import 'element-ui/lib/theme-chalk/index.css' // 样式
/* 引入重置样式 */
import './assets/css/rest.css'
/* 注册 */
Vue.use(ElementUI)
Vue.config.productionTip = false
//路由守卫拦截所有路由
router.beforeEach((to, from, next) => {
  //to:要进入目标路由对象  from：当前导航正要离开的路由 next:是一个函数，只有调用才能进入下步
  //获取浏览器的token
  const token = local.get('token');
  
    if (token) {
      //如果有token，直接放行
       next()
    } else {//如果没有token
        //登录才放行
        if(to.path==='/login'){
          next()
        }else{
          //直接跳转到登录界面
          next('/login')
        }
      
    }





})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')