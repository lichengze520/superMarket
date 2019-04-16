<template>
  <div class="home">
    <el-container>
      <!-- 左侧 -->
      <el-aside width="200px">
        <!-- 导航 -->
        <LeftNav></LeftNav>
      </el-aside>

      <!-- 右侧 -->
      <el-container>
        <!-- 头部 -->
        <el-header>
          <!-- 自定义头部组件 -->

          <top ref="top"></top>
        </el-header>

        <!-- 主体-->
        <el-main>
          <!-- 路由出口 -->
          <router-view @A="B"></router-view>
        </el-main>

        <!-- 页脚 -->
        <el-footer>
          <bottom>尾</bottom>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script>
//引入组件
import LeftNav from "@/components/LeftNav/LeftNav";
import Top from "@/components/Top/Top.vue";
import Bottom from "@/components/Bottom/Bottom.vue";
export default {
  //注册组件
  components: {
    LeftNav,
    Top,
    Bottom,
  },
  methods:{
    B(){
      this.$refs.top.getUserInfo()
    }
  }
};
</script>
<style lang="less">
//引入样式
@import "./home.less";
</style>
