<template>
  <div class="stock-total">

  <el-card class="box-card">
      <!-- 标题 -->
    <div slot="header" class="clearfix">
      <span>进货统计</span>
    </div>
    <!-- 内容 -->
    <div class="text item">
      <!-- 日期 -->
      <div class="block" style="text-align:left;">
        <span class="demonstration">时间：</span>
        <el-date-picker
          v-model="value6"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      <el-select v-model="value" placeholder="销售情况统计" style="margin-left:10px;margin-right:10px;width:140px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
      </el-select>
      <el-button type="success">查询</el-button>
    </div>
    </div>
  </el-card>
    
  </div>
</template>
<script>
export default {
  data(){
    return{
      value6:'',
      value: '',
      options:[
        {value: '选项1',
        label: '黄金糕'}
      ]
    }
  }
};
</script>
<style lang="less">
/* 引入样式 */
@import './stockTotal.less';
</style>