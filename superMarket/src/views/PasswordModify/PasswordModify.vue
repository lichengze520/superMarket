<template>
  <div class="password-modify">
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <span>修改密码</span>
      </div>
      <!-- 内容 -->
      <div class="text item">
        <el-form
          :model="modifyForm"
          status-icon
          :rules="rules"
          ref="modifyForm"
          label-width="100px"
          class="demo-ruleForm"
          style="width:300px"
        >
          <!-- 原密码 -->
          <el-form-item label="原密码:" prop="oldPassword">
            <el-input type="password" v-model="modifyForm.oldPassword" auto-complete="off"></el-input>
          </el-form-item>
          <!-- 新密码 -->
          <el-form-item label="新密码:" prop="newPassword">
            <el-input type="password" v-model="modifyForm.newPassword" auto-complete="off"></el-input>
          </el-form-item>
          <!-- 确认密码 -->
          <el-form-item label="确认密码:" prop="checkPass">
            <el-input type="password" v-model="modifyForm.checkPass" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="success" @click="submitForm()">
              <i class="round"></i>
              修改
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
//引入工具函数
import { passwordReg } from "@/utils/validator";
import local from "@/utils/local";
export default {
  data() {
    //自定义原密码验证函数
    const oldPassword = (rule, value, callback) => {
      //发送post请求 发送axios给后端
      this.request
        .post("account/oldPassword", { oldPassword: value })
        .then(res => {
          //接收数据
          let { code, reason } = res;
          //判断
          if(code===0){
             callback()//成功
          }else if(code===1){
              callback(new Error(reason))//失败
          }
        })
        .catch(err => {
          console.log(err);
        });
    };

    //自定义新密码验证函数
    const inputNewPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else if (value == !passwordReg(value)) {
        // 正则验证
        callback(new Error("需要包含字母"));
      } else {
        if (this.modifyForm.checkPass !== "") {
          //触发一次性认证
          this.$refs.modifyForm.validateField("checkPass");
        }
        callback(); //成功
      }
    };

    //自定义确认密码验证函数
    const confirmPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else if (value != this.modifyForm.newPassword) {
        callback(new Error("两次输入的密码不致"));
      } else {
        callback(); //成功
      }
    };

    return {
      //添加帐号表单数据
      modifyForm: {
        oldPassword: "",
        newPassword: "",
        checkPass: ""
      },
      //验证规则
      rules: {
        //原密码
        oldPassword: [
          { required: true, validator: oldPassword, trigger: "blur" } //非空
        ],
        //新密码
        newPassword: [
          { required: true, validator: inputNewPassword, trigger: "blur" } //自定义验证
        ],
        //确认密码
        checkPass: [
          { required: true, validator: confirmPassword, trigger: "blur" } //自定义验证
        ]
      }
    };
  },
  methods: {
    submitForm() {
      //修改
      this.$refs.modifyForm.validate(valid => {
        //如果前端验证通过valid就是true,否则就是false
        if (valid) {
          //收集新密码帐号数据
          let params = { newPassword: this.modifyForm.newPassword, };
          //发送post请求给后端
          this.request.post('/account/savenewpassword',params)
          .then(res=>{
            //接收数据
            let {code,reason}=res;
            //判断
            if(code===0){
             //弹成功提示
             this.$message({
               type:'succses',
               message:reason
             })
             //删除token
             local.remove('local')
             //跳转到登录界面
             setTimeout(() => {
                this.$router.push('/login')
             }, 1000);
            }else if(code===1){
               //弹提示
               this.$message.error(reason)
            }
             
          })
          .catch(err=>{
            console.log(err);
            
          })
       
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less">
@import "./passwordModify.less"; //引入样式
</style>