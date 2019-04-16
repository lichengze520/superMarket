import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
//导出路由实例对象
export default new Router({
  routes: [
    //  根目录重定向
    {
      path: '/',
      redirect: '/login'
    },
    //登录
    {
      path: '/login', //路径
      component: () => import('./views/Login/Login.vue') //组件
    },
    //后台主界面
    {
      path: '/home', //路径
      redirect: '/home/systeminfo', //重定向
      component: () => import('./views/Home/Home.vue'), //组件
      children: [{
          //系统信息
          path: '/home/systeminfo', //路径
          component: () => import('./views/SystemInfo/SystemInfo.vue'),
        },
          //个人信息
         { path: '/home/personal', //路径
          component: () => import('./views/Personal/Personal.vue'),
        },
        //账号添加
        {
          path: '/home/accontadd', //路径
          component: () => import('./views/AccontAdd/AccontAdd.vue')
        },
        //账号管理
        {
          path: '/home/accontmanage', //路径
          component: () => import('./views/AccontManage/AccontManage.vue')
        },
        //密码修改
        {
          path: '/home/passwordmodify', //路径
          component: () => import('./views/PasswordModify/PasswordModify.vue')
        },
        //商品添加
        {
          path: '/home/shopadd', //路径
          component: () => import('./views/ShopAdd/ShopAdd.vue')
        },
        //商品管理
        {
          path: '/home/shopmanage', //路径
          component: () => import('./views/ShopManage/ShopManage.vue')
        },
        //销售统计
        {
          path: '/home/saletotal', //路径
          component: () => import('./views/SaleTotal/SaleTotal.vue')
        },
        //进货统计
        {
          path: '/home/stocktotal', //路径
          component: () => import('./views/StockTotal/StockTotal.vue')
        },
        //添加库存
        {
          path: '/home/addrepertory', //路径
          component: () => import('./views/AddRepertory/AddRepertory.vue')
        },
        //库存管理
        {
          path: '/home/repertorymanage', //路径
          component: () => import('./views/RepertoryManage/RepertoryManage.vue')
        },
        //销售列表
        {
          path: '/home/saleslist', //路径
          component: () => import('./views/SalesList/SalesList.vue')
        },
        //商品出库
        {
          path: '/home/goodsout', //路径
          component: () => import('./views/GoodsOut/GoodsOut.vue')
        },
        //商品退货
        {
          path: '/home/goodsreturn', //路径
          component: () => import('./views/GoodsReturn/GoodsReturn.vue')
        },
        //添加会员帐号
        {
          path: '/home/memberadd', //路径
          component: () => import('./views/MemberAdd/MemberAdd.vue')
        },
        //会员帐号管理
        {
          path: '/home/membermanage', //路径
          component: () => import('./views/MemberManage/MemberManage.vue')
        },

      ]
    }
  ]
})