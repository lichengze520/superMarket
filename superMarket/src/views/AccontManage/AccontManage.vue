<template>
  <div class="accont-manage">
    <!--面板 -->
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <span>帐号管理</span>
      </div>
      <!-- 内容 -->
      <div class="text item">
        <el-table
          ref="multipleTable"
          :data="accountTableData"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <!-- 选择框 -->
          <el-table-column type="selection" width="55"></el-table-column>
          <!-- 账号 -->
          <el-table-column prop="account" label="账号"></el-table-column>
          <!-- 用户组 -->
          <el-table-column prop="userGroup" label="用户组"></el-table-column>
          <!-- 日期 -->
          <el-table-column label="日期">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
                <!-- 修改 -->
                <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">
                  <i class="el-icon-edit"></i>
                    修改
                </el-button>

                <!-- 删除 -->
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
                  <i class="el-icon-delete"></i>
                  删除
                </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="4"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          style="margin-top: 20px"
        ></el-pagination>
        <!-- 批量删除和取消选择 -->
        <div style="margin-top: 20px">
          <el-button type="danger" plain>批量删除</el-button>
          <el-button type="success" plain>取消选择</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //账号表格数据
      accountTableData: [
        {
          account: "李寻欢",
          userGroup: "超级管理员",
          date: "2019-04-08"
        },
        {
          account: "张三",
          userGroup: "超级管理员",
          date: "2019-04-08"
        }
      ],
      currentPage: 1, //当前页
      total: 20 //数据总条数
    };
  },
  methods: {
    handleEdit() {
      //修改
      console.log("修改");
    },
    handleDelete() {
      //删除
      console.log("删除");
    },
    handleSizeChange() {
      //每页条数
    },
    handleCurrentChange() {
      //当前页
    }
  }
};
</script>
<style lang="less">
//引入样式
@import "./accontManage.less";
</style>