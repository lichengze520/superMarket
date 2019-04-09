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
          <el-form-item label="原密码:" prop="password">
            <el-input type="password" v-model="modifyForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <!-- 新密码 -->
          <el-form-item label="新密码:" prop="password">
            <el-input type="password" v-model="modifyForm.password" auto-complete="off"></el-input>
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
export default {
  data() {
    return {
      modifyForm: {},
      rules: {
        //新密码
        password: [
          { required: true, message: "请输入帐号", trigger: "blur" } //非空
        ],
        //确认密码
         checkPass: [
          { required: true, message: "请输入帐号", trigger: "blur" } //非空
        ]
      }
    };
  },
  methods: {
    submitForm() {
      //修改
    }
  }
};
</script>
<style lang="less">
@import "./passwordModify.less"; //引入样式
</style>