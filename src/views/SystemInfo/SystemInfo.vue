<template>
  <div class="sale-total">
    <!-- 面板 -->
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <span>系统信息</span>
      </div>
      <!-- 内容 -->
      <div class="text item">
        <!-- 提示信息 -->
        <div class="message">
          <el-alert title="商品总数:5。已销售的总金额为：890.00。库存商品总价：1235.82" type="warning" show-icon></el-alert>
          <el-alert title="导入数据" type="warning" show-icon></el-alert>
        </div>
        <!-- 商品信息 -->
        <div class="goodsInfo">
          <el-row>
            <!-- 销售排行 -->
            <el-col :span="11">
              <el-card class="box-card left">
                <!-- 头部 -->
                <div slot="header" class="clearfix">
                  <span>销售排行</span>
                </div>
                <!-- 内容 -->
                <div class="text item">
                  <el-table :data="salesData" stripe >
                    <el-table-column prop="name" label="商品名称"></el-table-column>
                    <el-table-column prop="nums" label="数量"></el-table-column>
                  </el-table>
                </div>
              </el-card>
            </el-col>

            <!-- 缺货的商品 -->
            <el-col :span="12">
              <el-card class="box-card left">
                <!-- 头部 -->
                <div slot="header" class="clearfix">
                  <span>缺货的商品</span>
                </div>
                <!-- 内容 -->
                <div class="text item">
                  <el-table :data="stockData" stripe>
                    <el-table-column prop="name" label="商品名称"></el-table-column>
                    <el-table-column prop="stock" label="库存"></el-table-column>
                    <el-table-column prop="handle" label="操作"></el-table-column>
                  </el-table>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //销售数据
      salesData: [
        { name: "茅台酒", nums: 6 },
        { name: "茅台酒", nums: 6 },
        { name: "茅台酒", nums: 6 },
        { name: "茅台酒", nums: 6 },
        { name: "茅台酒", nums: 6 }
      ],
      //缺货的商品数据
       stockData: [
        { name: "茅台酒", stock: 6 ,handle:'入库'},
       
      ]
    };
  }
};
</script>
<style lang="less">
//引入css样式
@import "./systemInfo.less";
</style>