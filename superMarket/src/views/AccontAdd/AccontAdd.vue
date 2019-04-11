<template>
  <div class="accont-add">
    <!-- 添加面板 -->
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <span>帐号添加</span>
      </div>
      <!-- 内容 -->
      <div class="text item">
        <el-form
          :model="accontAddForm"
          status-icon
          :rules="rules"
          ref="accontAddForm"
          label-width="100px"
          class="demo-ruleForm"
          style="width:300px"
        >
          <!-- 账号 -->
          <el-form-item label="帐号" prop="account">
            <el-input type="text" v-model="accontAddForm.account" autocomplete="off"></el-input>
          </el-form-item>

          <!-- 密码 -->
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="accontAddForm.password" autocomplete="off"></el-input>
          </el-form-item>

          <!-- 确认密码 -->
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="accontAddForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>

          <!-- 选择用户分组 -->
          <el-form-item label="用户分组" prop="userGroup">
            <el-select v-model="accontAddForm.userGroup" placeholder="选择用户分组">
              <el-option label="管理员" value="管理员"></el-option>
              <el-option label="普通用户" value="普通用户"></el-option>
            </el-select>
          </el-form-item>

          <!-- 按钮 -->
          <el-form-item>
            <el-button type="success" @click="submitForm()">添加</el-button>
            <el-button @click="resetForm()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
//引入工具函数
import { passwordReg } from "@/utils/validator";
export default {
  data() {
    //自定义验证函数
    const inputPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else if (!passwordReg(value)) {
        //正则验证
        callback(new Error("需要包含字母"));
      } else {
        if (this.accontAddForm.checkPass !== "") {
          //触发一次认证
          this.$refs.accontAddForm.validateField("checkPass");
        }
        callback(); //成功
      }
    };
    //自定义验证确认密码函数
    const confirmPassword = (rule, value, callback) => {
      if (value === "") {
        //非空
        callback(new Error("确认密码不能为空"));
      } else if (value !== this.accontAddForm.password) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback(); //成功
      }
    };

    return {
      //添加帐号表单数据
      accontAddForm: {
        account: "",
        password: "",
        checkPass: "",
        userGroup: ""
      },
      //验证规则
      rules: {
        //账号
        account: [
          { required: true, message: "请输入帐号", trigger: "blur" }, //非空
          { min: 3, max: 6, message: "账号长度为3~6位", trigger: "blur" } //长度
        ],
        //密码
        password: [
          { required: true, validator: inputPassword, trigger: "blur" } //自定义验证
        ],
        //确认密码
        checkPass: [
          { required: true, validator: confirmPassword, trigger: "blur" } //自定义验证
        ],
        //用户分组
        userGroup: [
          { required: true, message: "请选择用户分组", trigger: "change" } //非空
        ]
      }
    };
  },
  methods: {
    submitForm() {
      //添加
      this.$refs.accontAddForm.validate(valid => {
        //如果前端验证通过valid就是true,否则就是false;
        if (valid) {
          //收集账号数据
          let params = {
            account: this.accontAddForm.account,
            userGroup: this.accontAddForm.userGroup,
            password: this.accontAddForm.password
          };
          console.log(params);
          console.log(this.request);
          // 发送axios请求 把数据发给后端
          this.request
            .post("/account/accountadd", params)
            .then(res => {
              // 获取后端响应回来的数据
              let { code, reason } = res;
              // 判断
              if (code === 0) {
                // 成功
                // 弹成功提示
                this.$message({
                  type: "success",
                  message: reason
                });
                // 跳转账号列表
                this.$router.push("/home/accontmanage");
              } else if (code === 1) {
                // 失败
                // 弹失败提示
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("前端验证未通过，请重新提交");
          return false;
        }
      });
    },
    resetForm() {
      //重置
      this.$refs.accontAddForm.resetFields();
    }
  }
};
</script>
<style lang="less">
/* 引入css样式 */
@import "./accont.less";
</style>
