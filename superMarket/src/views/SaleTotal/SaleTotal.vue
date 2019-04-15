<template>
  <div class="sale-total">
    <el-card class="box-card">
      <!-- 标题 -->
    <div slot="header" class="clearfix">
      <span>销售数据统计</span>
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
            <el-button type="success">提交</el-button>
          </div>
            <div class="text item">
                <!-- 1 准备一个容器 -->
                <div id="box" style="height: 400px;"></div>
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
  },
   mounted() {
      // 2019-04-10 2019-04-15
      // 这是后端响应的数据   
      var res = {
          categoryName: ['2019-04-10', '2019-04-11', '2019-04-12', '2019-04-13', '2019-04-14', '2019-04-15', '2019-04-16'],
          value: [500, 1500, 3000, 2000, 1250, 460, 5000]
      }

      let {categoryName, value} = res;

      this.drawSalesChart(categoryName, value); // 调用函数 生成报表
   },
      methods: {
    // 生成销售报表
    drawSalesChart(categoryData=[], value=[]) {
        // 选中dom容器 初始化
        let myChart = this.echarts.init( document.getElementById('box') )
        // 准备配置
        let option = {
            tooltip: {
                show: true
            },
            legend: {
                data:['销量']
            },
            xAxis : [
                {
                    type : 'category',
                    data : categoryData
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    "name":"销量",
                    "type":"line",
                    "data":value
                }
            ]
        }
        // 使用配置生成报表
        myChart.setOption( option )
    }
   } 
}
</script>
<style lang="less">
/* 引入样式 */
@import './sale-total.less';
</style>