<template>
  <div class="shop-add">
    <!-- 添加面板 -->
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <span>添加商品</span>
      </div>
      <!-- 内容 -->
      <div class="text item">
        <el-form
          :model="ShopAddForm"
          :rules="rules"
          ref="ShopAddForm"
          label-width="100px"
          class="demo-ruleForm"
          style="width:300px"
        >
          <!--  所属分类-->
          <el-form-item label="所属分类:" prop="classify">
            <el-select v-model="ShopAddForm.classify" placeholder="—— ——选择分类 —— ——">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <!-- 商品名称 -->
          <el-form-item label="商品名称:" prop="name">
            <el-input v-model="ShopAddForm.name"></el-input>
          </el-form-item>
          <!-- 商品售价 -->
          <el-form-item label="商品售价:" prop="salePrice">
            <el-input v-model="ShopAddForm.salePrice"></el-input>
          </el-form-item>
          <!-- 市场价 -->
          <el-form-item label="市场价:" prop="marketPrice">
            <el-input v-model="ShopAddForm.marketPrice"></el-input>
          </el-form-item>

          <!-- 商品进价 -->
          <el-form-item label="商品进价:" prop="purchasingPrice">
            <el-input v-model="ShopAddForm.purchasingPrice"></el-input>
          </el-form-item>
          <!-- 入库数量 -->
          <el-form-item label="入库数量:" prop="stockNum">
            <el-input v-model="ShopAddForm.stockNum"></el-input>
          </el-form-item>

          <!-- 商品总量 -->
          <el-form-item label="商品总量:" prop="shopNum">
            <el-input v-model="ShopAddForm.shopNum"></el-input>
          </el-form-item>

          <!-- 商品单位 -->
          <el-form-item label="商品单位:" prop="shopUnit">
            <el-input v-model="ShopAddForm.shopUnit"></el-input>
          </el-form-item>

          <!-- 会员优惠 -->
          <el-form-item label="会员优惠:" prop="reducedPrice">
            <el-radio-group v-model="ShopAddForm.reducedPrice">
              <el-radio label="享受"></el-radio>
              <el-radio label="不享受"></el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- 是否促销 -->
          <el-form-item label="是否促销:" prop="salesPromotion">
            <el-radio-group v-model="ShopAddForm.salesPromotion">
              <el-radio label="启用"></el-radio>
              <el-radio label="禁用"></el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- 商品简介 -->
          <el-form-item label="商品简介:" prop="productIntroduction">
            <el-input type="textarea" v-model="ShopAddForm.productIntroduction"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="submitForm()">添加</el-button>
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
      //表单数据
      ShopAddForm: {},
      //验证规则
      rules: {
        //商品分类
        //商品条形码
        //商品名称
        name:[
          { required:true,message:'商品名称为必填项目',trigger:'blur'}//非空
          ]
        //商品售价
      }
    };
  },
  methods:{
    //添加
    submitForm(){
      
    }
  }
};
</script>

<style lang="less">
/* 引入样式 */
@import "./shopadd.less";
</style>