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
          @selection-change="handleSelectionChange"
          ref="accountTableData"
          :data="accountTableData"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <!-- 选择框 -->
          <el-table-column type="selection" width="55"></el-table-column>
          <!-- 账号 -->
          <el-table-column prop="account" label="账号"></el-table-column>

          <!-- 用户组 -->
          <el-table-column prop="user_group" label="用户组"></el-table-column>

          <!-- 日期 -->
          <el-table-column label="日期">
            <template slot-scope="scope">{{ scope.row.create_date | filterDate }}</template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- 修改 -->
              <el-button size="mini" type="primary" @click="handleEdit(scope.row.id)">
                <i class="el-icon-edit"></i>
                修改
              </el-button>

              <!-- 删除 -->
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">
                <i class="el-icon-delete"></i>
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 修改模态框 -->
        <el-dialog width="400px" title="修改账号" :visible.sync="dialogFormVisible">
          <!-- 修改表单 -->
          <el-form :model="editForm" :rules="rules" ref="editForm">
            <!-- 账号 -->
            <el-form-item
              prop="account"
              style="width:300px;"
              label="账号"
              :label-width="formLabelWidth"
            >
              <el-input v-model="editForm.account" auto-complete="off"></el-input>
            </el-form-item>

            <!-- 用户组 -->
            <el-form-item prop="userGroup" label="用户组" :label-width="formLabelWidth" style="margin-right:80px;width:300px;">
              <el-select v-model="editForm.userGroup" placeholder="请选择用户组">
                <el-option label="超级管理员" value="超级管理员"></el-option>
                <el-option label="普通用户" value="普通用户"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit">确 定</el-button>
          </div>
        </el-dialog>

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
        <!-- 批量删除和取消选择 -->
        <div style="margin-top: 20px;text-align:left">
          <el-button type="danger" @click="batchDel">批量删除</el-button>
          <el-button type="success" @click="cancelSelect">取消选择</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
/* 引入moment */
import moment from "moment";
export default {
  data() {
    return {
      //账号表格数据
      accountTableData: [],
      currentPage: 1, //当前页
      pageSize:4,
      total: 0, //数据总条数
      editForm: {
        // 修改模态框的数据对象
        account: "",
        userGroup: ""
      },
      editId: '', // 要修改的数据的id
      dialogFormVisible: false,  // 模态框的显示和隐藏状态
      formLabelWidth: '100px', // 修改表单标签的宽度
      rules: { // 修改表单验证规则
        // 账号
        account: [
          {required: true, message: '账号不能为空', trigger: 'blur'}, // 非空
          {min: 3, max: 6, message: '账号长度 3~6 位', trigger: 'blur'} // 非空
        ]
      },
      selectedId: [] // 批量删除选中id数组
    };

  },
  methods: {
    //请求所有帐号数据
    // getAccountList() {
    //   // 发送axios 请求所有账号数据
    //   this.request
    //     .get("/account/accountlist")
    //     .then(res => {
    //       // 把后端请求到的数据 直接赋值给accountTableData
    //       this.accountTableData = res;
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    //按照分页请求数据
     getAccountListByPage() {
      // 收集参数
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      // 请求数据
      this.request.get('/account/accountlistbypage', params)
        .then(res => {
          // 接收后端返回的数据
           let {total,  data} = res;
          console.log(res);
          
          // 赋值给对应变量
          this.total = total;
          this.accountTableData = data;
          
          // 如果这一页已经没有数据了
          if (!data.length && this.currentPage !== 1) {
            // 回到上一页
            this.currentPage -= 1;
            // 调用自己
            this.getAccountListByPage();
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    //修改
    handleEdit(id) { 
      //显示模态框
       this.dialogFormVisible = true;
       // 把要修改的id 保存起来
       this.editId = id;
       //发送请求，把id发给后端
       this.request .get("account/editaccount", { id })
        .then(res => {  
          // 数据回填
          this.editForm.account = res[0].account;
          this.editForm.userGroup= res[0].user_group;
        })
        .catch(err => {
          console.log(err);
          
        });
    },
    // 保存修改
    saveEdit() {
      // 获取整个表单验证
      this.$refs.editForm.validate(valid => {
        if (valid) { // 前端验证通过
            // 关闭模态框
            this.dialogFormVisible = false;

            // 收集参数
            let params = {
              account: this.editForm.account,
              userGroup: this.editForm.userGroup,
              editId: this.editId
            }
            // 发送请求把新数据 和 原来的id 一起发送给后端
            this.request.post('/account/saveeditaccount', params)
              .then(res => {
                // 接收后端响应的数据
                let {code, reason} = res;
                if (code === 0) {
                  // 弹提示 
                  this.$message({
                    type: 'success',
                    message: reason
                  })
                  // 刷列表
                  this.getAccountListByPage()
                  
                } else if (code === 1) {
                  // 弹提示
                  this.$message.error(reason)
                }
              })
              .catch(err => {
                console.log(err)
              })

        } else {
          // 不合法 不能提交
          return false;
        }
      })
    },
    //取消选择
    cancelSelect(){
         this.$refs.accountTableData.clearSelection() // 选中整个表格 调用函数取消选择
    },
     // 当选中选择框的状态发生变化，就会触发这个函数，而且传入被选中的数据 val是一个数组
    handleSelectionChange(val) {
      // 获取被选中的id 放入一个数组
      this.selectedId = val.map(v => v.id);
      console.log( this.selectedId )
    },
    //批量删除
    batchDel(){
         //如果没有选中给出错误提示
         if(!this.selectedId.length){
           //弹出错误提示
           this.$message.error('请选择以后在操作')
           return
         }
        //优化删除体验
        this.$confirm('你确定要批量删除吗?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(()=>{
         //收集选中的id一起发送给后端
        let params={
          idArr: this.selectedId
        }
        //发送请求给后端，把选中的id一起发送给后端
        this.request.get('/account/batchdel',params)
         .then(res=>{
           //接收数据
           let {code,reason}=res
           //判断
           if(code===0){
           //弹提示
           this.$message({
             code:'success',
             message:reason
           })
           //刷新列表
           this.getAccountListByPage()
           }else if(code===1){
           //弹提示
           this.$message.error(reason)
           }
           
         })
         .catch(err=>{
           console.log(err);
           
         })
      }).catch(()=>{//取消
         this.$message({
            type: 'info',
            message: '已取消删除'
        })
      })
        
    },
    //删除
    handleDelete(id) {
      //优化删除体验
      this.$confirm("你确定要删除吗?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.request
            .get("/account/delaccount", { id })
            .then(res => {
              //接收后端响应的数据
              let { code, reason } = res;
              //判断
              if (code === 0) {
                //弹出成功提示
                this.$message({
                  type: "success",
                  message: reason
                });
                //刷新帐号列表
                this.getAccountListByPage();
              } else if (code === 1) {
                //弹出失败提示
                this.$message.errom(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
     //每页条数改变
    handleSizeChange(val) {
      //每页条数
      this.pageSize=val
      //调用分页函数
      this.getAccountListByPage()
      
    },
      //当前页
    handleCurrentChange(val) {
      console.log(val);
      //把页码赋值给currentPage
      this.currentPage=val;
      //调用分页函数
      this.getAccountListByPage()
    }
  },
  // 生命周期钩子函数 vue实例对象创建完成 dom还没有生成
  created() {
    this.getAccountListByPage(); //调用所有帐号数据
  },
  filters: {
    // 过滤时间
    filterDate(time) {
      return moment(time).format("YYYY/MM/DD hh:mm:ss");
    }
  }
};
</script>
<style lang="less">
//引入样式
@import "./accontManage.less";
</style>