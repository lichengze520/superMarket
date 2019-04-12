<template>
  <div class="shop-add">
    <!-- 添加面板 -->
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <span>商品管理</span>
      </div>
      <!-- 内容 -->
      <div class="text item">
        <!-- 商品查询 -->

        <el-form :inline="true" :model="formInline" class="demo-form-inline" style="text-align: left;" >
              <!-- 选择分类 -->
              <el-form-item>
                <el-select v-model="formInline.region" placeholder="－－－　选择分类　－－－">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <!-- 商品名称 -->
              <el-form-item label="关键字：">
                    <el-input v-model="formInline.user"></el-input>
                    </el-form-item>
                        <span style="display: inline-block;margin-top:10px;margin-right:4px">(商品名称，条形码)</span>
                        <!-- 查询 -->
                    <el-form-item>
                    <el-button type="success" @click="onSubmit">查询</el-button>
              </el-form-item>
        </el-form>

        <!-- 产品列表名细 -->
        <el-table :data="tableData" border style="width: 100%;font-size:16px">
          <el-table-column prop="shopCode" label="商品条形编码" width="200"></el-table-column>
          <el-table-column prop="name" label="商品名称" width="200"></el-table-column>
          <el-table-column prop="classify" label="所属分类" width="200"></el-table-column>
          <el-table-column prop="price" label="售价" width="200"></el-table-column>
          <el-table-column prop="promotionPrice" label="促销价" width="200"></el-table-column>
          <el-table-column prop="marketPrice" label="市场价" width="200"></el-table-column>
          <el-table-column prop="stock" label="库存" width="200"></el-table-column>
          <el-table-column prop="stockTotal" label="库存总额（元）" width="200"></el-table-column>
          <el-table-column prop="saleTotal" label="销售总额（元）" width="200"></el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="primary" icon="el-icon-edit"></el-button>
              <el-button type="primary" icon="el-icon-share"></el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[3, 4, 5, 6]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          style="margin-top: 20px;text-align:left"
        ></el-pagination>


      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      tableData: [
        {
          shopCode: 12345678,
          name: "茅台酒",
          classify: "茅台",
          price: "200.00",
          promotionPrice: "未促销",
          marketPrice: 240.0,
          stock: 6,
          stockTotal: 900.0,
          saleTotal: 800.0
        },
        {
          shopCode: 12345678,
          name: "茅台酒",
          classify: "茅台",
          price: "200.00",
          promotionPrice: "未促销",
          marketPrice: 240.0,
          stock: 6,
          stockTotal: 900.0,
          saleTotal: 800.0
        },
        {
          shopCode: 12345678,
          name: "茅台酒",
          classify: "茅台",
          price: "200.00",
          promotionPrice: "未促销",
          marketPrice: 240.0,
          stock: 6,
          stockTotal: 900.0,
          saleTotal: 800.0
        },
        {
          shopCode: 12345678,
          name: "茅台酒",
          classify: "茅台",
          price: "200.00",
          promotionPrice: "未促销",
          marketPrice: 240.0,
          stock: 6,
          stockTotal: 900.0,
          saleTotal: 800.0
        },
         {
          shopCode: 12345678,
          name: "茅台酒",
          classify: "茅台",
          price: "200.00",
          promotionPrice: "未促销",
          marketPrice: 240.0,
          stock: 6,
          stockTotal: 900.0,
          saleTotal: 800.0
        }
      ],
      currentPage: 1, //当前页
      pageSize:4,
      total: 2, //数据总条数
    };
  },
  methods: {
    //商品查询
    onSubmit() {
      console.log("查询!");
    },
    //
    handleClick(row) {
      console.log('编辑',row);
    },
    handleSizeChange(){//每页条数
      console.log('每页条数');
      
    },
     handleCurrentChange(){//当前页
      console.log('当前页');

    },
  }
};
</script>
<style lang="less">
/*引入css样式*/
@import "./shopmanage.less";
</style>