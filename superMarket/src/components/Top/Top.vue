<template>
  <div class="top">
    <el-row :gutter="20">
      <!-- 左侧标题 -->
      <el-col :span="22">
        <h3 class="title">
          <i class="el-icon-menu"></i>
          好友多超市管理系统
        </h3>
      </el-col>

      <!-- 右侧头像和当前登录用户帐号名 -->
      <el-col :span="2">
        <el-row >
          <!-- 头像 -->
          <el-col :span="12">
            <div class="avatar">
              <img src="./img (2).jpg" alt="头像" width="100%" height="100%">
            </div>
          </el-col>
          <!-- 登录帐号名 -->
          <el-col :span="12">
            <el-dropdown>
                <span class="el-dropdown-link">
                  存折<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="a">个人中心</el-dropdown-item>
                    <el-dropdown-item command="b">退出系统</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less">
@import "./top.less";
</style>
