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
        <el-row>
          <!-- 头像 -->
          <el-col :span="12">
            <div class="avatar">
              <img width="100%" height="100%" :src="imgUrl" alt>
            </div>
          </el-col>
          <!-- 登录帐号名 -->
          <el-col :span="12">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                {{account}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="personal">个人中心</el-dropdown-item>
                <el-dropdown-item command="logout">退出系统</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
//引入local
import local from "@/utils/local";
export default {
  data() {
    return {
      account: "",
      imgUrl: ""
    };
  },
  methods: {
    //点击下拉菜单项触发函数
    handleCommand(command) {
      if (command === "personal") {
        this.$router.push("/home/personal");
      } else if (command === "logout") {
        //清楚token
        local.remove("token");
        //退出提示
        this.$message({
          type: "success",
          message: "退出成功，欢迎下次登录"
        });
        setTimeout(() => {
          //跳转到登录页面
          this.$router.push("/login");
        }, 1000);
      }
    },
    //获取当前登录账号
    getUserInfo() {
      this.request
        .get("/account/accountinfo")
        .then(res => {
          console.log(res);
          
          //接收后端响应的数据
          let { account, img_url } = res[0];
          //赋值给对应的变量
          this.account=account;
          this.imgUrl = `http://127.0.0.1:666/${img_url}`;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    // 调用函数 获取当前登录账号
    this.getUserInfo();
  }
};
</script>
<style lang="less">
@import "./top.less";
</style>
