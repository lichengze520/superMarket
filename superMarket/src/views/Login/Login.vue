<template>
  <div class="login">
    <!-- 登录容器 -->
    <div class="login-wrap">
      <!-- 标题 -->
      <h3 class="title">
        <i class="el-icon-loading"></i>
        好友多超市管理系统
      </h3>
      <!-- 登录表单 -->
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 帐号 -->
        <el-form-item label="帐号" prop="account">
          <el-input type="text" v-model="loginForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 密码-->
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="loginForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 登录 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm()">登录</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
/* 引入验证密码函数 */
import { passwordReg } from "@/utils/validator.js";
/* 引入local */
import local from '@/utils/local';
export default {
  data() {
    //确认密码验证函数
    const confirmPassword = (rule, value, callback) => {
      //rule:验证规则；value:用户输入的值；callback:回调函数
      if (value === "") {
        callback(new Error("确认密码不能为空")); //错误提示
      } else if (value !== this.loginForm.password) {
        callback(new Error("两次输入的密码不致")); //错误提示
      } else {
        callback();
      }
    };
    const checkPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空")); //错误提示
      } else if (!passwordReg(value)) {
        callback(new Error("需含有字母")); //错误提示
      } else {
        if (this.loginForm.checkPass !== "") {
          //确认密码不能为空
          this.$refs.loginForm.validateField("checkPass"); //触发一次性认证
        }
        callback(); //成功回调
      }
    };
    //密码的自定义验证函数
    return {
      //表单数据
      loginForm: {
        account: "",
        password: "",
        checkPass: ""
      },
      //验证规则
      rules: {
        //帐号
        account: [
          { required: true, message: "请输入帐号", trigger: "blur" }, //非空账号
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" } //帐号长度
        ],
        //密码
        password: [
          { required: true, validator: checkPassword, trigger: "blur" } // 自定义验证
        ],
        //确认密码
        checkPass: [
          { required: true, validator: confirmPassword, trigger: "blur" } //自定义规则
        ]
      }
    };
  },
  methods: {
    /* 登录 */
    submitForm() {
      this.$refs.loginForm.validate(valid => {
        //如果所有前端验证通过 valid就是true,否则就是false
        if (valid) {
          //提交数据给后端
          let params = {
            account: this.loginForm.account,
            password: this.loginForm.password
          };
          //检查用户名和密码是否正确
          this.request.post('login/checklogin',params)
            .then(res=>{
              //获取后端响应的数据
              let {code,reason,token}=res
               if(code==0){
                 //把token存入浏览器
                 local.save('token',token)
                 //成功
                 //弹成功提示
                this.$message({
                  type:'success',
                  message:reason
                })
                 this.$router.push("/home");//跳转到首页
               }else if(code===1){
                 //失败
                 //弹失败提示
                 this.$message.error(reason)
               }
            })
            .catch(err=>{
                console.log(err);
                
            })
        } else {
          console.log("前端验证没有通过，不允许提交");
          return false;
        }
      });
    },

    /* 重置 */
    resetForm() {
      //重置表单
      this.$refs.loginForm.resetFields();
    },
    
  }
};
</script>
<style lang="less">
@import "./login.less";
</style>
