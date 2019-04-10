<template>
  <div class="left-nav">
    <!-- 左侧导航 -->
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="rgba(48,65,86)"
      text-color="#fff"
      active-text-color="rgba(64,158,255)"
      unique-opened
      router
    >
      <!-- 导航-->
      <el-submenu :index="(index+1)+''" v-for="(menu,index) in menus" :key="index">
          <!-- 图片和标题 -->
          <template slot="title">
            <i :class="menu.iconClass"></i>
            <span>{{menu.title}}</span>
          </template>
          <!-- 二级导航 -->
          <el-menu-item  
            v-for="(subMenu,index) in menu.children" 
            :key="index"
            :index="subMenu.path"
          >
             {{subMenu.subTitle}}
          </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //导航菜单数据
      menus: [
        //系统管理
        {
          iconClass: "el-icon-menu",
          title: "系统管理",
          children: [
            //子菜单
            { path: "/home/systeminfo", subTitle: "系统信息" }
          ]
        },
        //帐号管理
        {
          iconClass: "el-icon-mobile-phone",
          title: "帐号管理",
          children: [
            //子菜单
            { path: "/home/accontmanage", subTitle: "帐号管理" },
            { path: "/home/accontadd", subTitle: "添加帐号" },
            { path: "/home/passwordmodify", subTitle: "密码修改" }
          ]
        },
        //商品管理
        {
          iconClass: "el-icon-rank",
          title: "商品管理",
          children: [
            //子菜单
            { path: "/home/shopmanage", subTitle: "商品管理" },
            { path: "/home/shopadd", subTitle: "添加商品" }
          ]
        },
        //统计管理
        {
          iconClass: 'el-icon-upload',
          title: "统计管理",
          children: [
            //子菜单
            { path: "/home/saletotal", subTitle: "销售统计" },
            { path: "/home/stocktotal", subTitle: "进货统计" }
          ]
        },
        //进货管理
        {
          iconClass: "el-icon-goods",
          title: "进货管理",
          children: [
            //子菜单
            { path: "/home/addrepertory", subTitle: "添加库存" },
            { path: "/home/repertorymanage", subTitle: "库存管理" }
          ]
        },
        //出货管理
        {
          iconClass: "el-icon-sold-out",
          title: "出货管理",
          children: [
            //子菜单
            { path: "/home/saleslist", subTitle: "销售列表" },
            { path: "/home/goodsout", subTitle: "商品出库" },
            { path: "/home/goodsreturn", subTitle: "商品退货" }
          ]
        },
        //会员管理
        {
          iconClass: "el-icon-menu",
          title: "会员管理 ",
          children: [
            //子菜单
            { path: "/home/memberadd", subTitle: "添加会员帐号" },
            { path: "/home/membermanage", subTitle: "会员帐号管理" }
          ]
        }
      ]
    };
  }
};
</script>

<style lang="less">
//引入样式
@import "./LeftNav.less";
</style>
