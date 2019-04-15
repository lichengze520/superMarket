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
          style="width: 300px;"
          size="small"
          :model="goodsAddForm"
          status-icon
          :rules="rules"
          ref="goodsAddForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <!-- 商品分类 -->
          <el-form-item label="选择分类" prop="cateName">
            <el-select v-model="goodsAddForm.cateName" placeholder="请选择分类">
              <el-option label="电子类" value="电子类"></el-option>
              <el-option label="烟酒类" value="烟酒类"></el-option>
              <el-option label="食品类" value="食品类"></el-option>
              <el-option label="服装类" value="服装类"></el-option>
              <el-option label="蔬菜类" value="蔬菜类"></el-option>
            </el-select>
          </el-form-item>

          <!-- 商品条形码 -->
          <el-form-item label="商品条形码" prop="barCode">
            <el-input type="text" v-model="goodsAddForm.barCode" autocomplete="off"></el-input>
          </el-form-item>

          <!-- 商品名称 -->
          <el-form-item label="商品名称" prop="goodsName">
            <el-input type="text" v-model="goodsAddForm.goodsName" autocomplete="off"></el-input>
          </el-form-item>

          <!-- 商品进价 -->
          <el-form-item label="商品进价" prop="costPrice">
            <el-input type="text" v-model="goodsAddForm.costPrice" autocomplete="off"></el-input>
          </el-form-item>

          <!--  市场价 -->
          <el-form-item label="市场价" prop="marketPrice">
            <el-input type="text" v-model="goodsAddForm.marketPrice" autocomplete="off"></el-input>
          </el-form-item>

          <!-- 商品售价 -->
          <el-form-item label="商品售价" prop="salePrice">
            <el-input type="text" v-model="goodsAddForm.salePrice" autocomplete="off"></el-input>
          </el-form-item>

          <!-- 入库数量 -->
          <el-form-item label="入库数量" prop="goodsNum">
            <el-input type="text" v-model="goodsAddForm.goodsNum" autocomplete="off"></el-input>
          </el-form-item>

          <!-- 商品重量 -->
          <el-form-item label="商品重量" prop="goodsWeight">
            <el-input type="text" v-model="goodsAddForm.goodsWeight" autocomplete="off"></el-input>
          </el-form-item>

          <!-- 商品单位 -->
          <el-form-item label="商品单位" prop="unit">
            <el-select v-model="goodsAddForm.unit" placeholder="请选择单位">
              <el-option label="个" value="个"></el-option>
              <el-option label="瓶" value="瓶"></el-option>
              <el-option label="盒" value="盒"></el-option>
              <el-option label="g" value="g"></el-option>
              <el-option label="kg" value="kg"></el-option>
              <el-option label="条" value="条"></el-option>
              <el-option label="条" value="条"></el-option>
              <el-option label="袋" value="袋"></el-option>
              <el-option label="件" value="件"></el-option>
              <el-option label="只" value="只"></el-option>
            </el-select>
          </el-form-item>

          <!-- 会员优惠 -->
          <el-form-item label="会员优惠" prop="discount">
            <el-radio-group v-model="goodsAddForm.discount">
              <el-radio label="享受"></el-radio>
              <el-radio label="不享受"></el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- 是否促销 -->
          <el-form-item label="是否促销" prop="promotion">
            <el-radio-group v-model="goodsAddForm.promotion">
              <el-radio label="促销"></el-radio>
              <el-radio label="不促销"></el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- 商品简介 -->
          <el-form-item label="商品简介">
            <el-input type="textarea" v-model="goodsAddForm.goodsDesc"></el-input>
          </el-form-item>

          <!-- 按钮 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm()">添加</el-button>
            <el-button @click="resetForm()">重置</el-button>
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
      //商品添加表格
      goodsAddForm: {
        cateName: "",
        barCode: "",
        goodsName: "",
        costPrice: "",
        marketPrice: "",
        salePrice: "",
        goodsNum: "",
        goodsWeight: "",
        unit: "",
        discount: "",
        promotion: "",
        goodsDesc: ""
      },
      rules: {
        cateName: [{ required: true, message: "不能为空", trigger: "change" }],
        barCode: [{ required: true, message: "不能为空", trigger: "blur" }],
        goodsName: [{ required: true, message: "不能为空", trigger: "blur" }],
        costPrice: [{ required: true, message: "不能为空", trigger: "blur" }],
        marketPrice: [{ required: true, message: "不能为空", trigger: "blur" }],
        salePrice: [{ required: true, message: "不能为空", trigger: "blur" }],
        goodsNum: [{ required: true, message: "不能为空", trigger: "blur" }],
        goodsWeight: [{ required: true, message: "不能为空", trigger: "blur" }],
        unit: [{ required: true, message: "不能为空", trigger: "change" }],
        discount: [{ required: true, message: "不能为空", trigger: "change" }],
        promotion: [{ required: true, message: "不能为空", trigger: "change" }],
        goodsDesc: [{ required: true, message: "不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    //添加商品
    submitForm() {
      this.$refs.goodsAddForm.validate(valid => {
        if (valid) {
              //收集数据
              let params = {
                cateName: this.goodsAddForm.cateName,
                barCode: this.goodsAddForm.barCode,
                goodsName: this.goodsAddForm.goodsName,
                costPrice: this.goodsAddForm.costPrice,
                marketPrice: this.goodsAddForm.marketPrice,
                salePrice: this.goodsAddForm.salePrice,
                goodsNum: this.goodsAddForm.goodsNum,
                goodsWeight: this.goodsAddForm.goodsWeight,
                unit: this.goodsAddForm.unit,
                discount: this.goodsAddForm.discount,
                promotion: this.goodsAddForm.promotion,
                goodsDesc: this.goodsAddForm.goodsDesc
              };
              //发送axios请求
              this.request
                .post("/goods/goodsadd", params)
                .then(res => {
                  //接收数据
                  let {code,reason}=res
                    if(code===0){
                      //弹提示
                      this.$message({
                        type:'success',
                        message:reason
                      })
                      //跳转到商品列表
                      this.$router.push('/home/shopmanage')
                    }else if(code===1){
                      this.$message.error(reason)
                    }
                })
                .catch(err => {
                  console.log(err);
                });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less">
/* 引入样式 */
@import "./shopadd.less";
</style>