<template>
     <div id="barChart"></div>
</template>

<script>
 import echarts from "echarts";
 export default {
   data () {
     return {

     }
   },
   mounted(){
     this.$nextTick(() => {
      this.initChart();
    });
   },
   methods:{
        initChart() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("barChart"));

      var option = {
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: ['直接访问', '邮件营销','联盟广告','视频广告','搜索引擎']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    yAxis:  {
        type: 'value'
    },
    xAxis: {
        type: 'category',
        data: ['项目分类','问题分类']
    },
    series: [
        {
            name: '直接访问',
            type: 'bar',
            stack: '总量',
            barWidth:80,
            label: {
                normal: {
                    show: true,
                    position: 'insideTop'
                }
            },
            data: [320, 302]
        },
        {
            name: '邮件营销',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideTop'
                }
            },
            data: [120, 132]
        },
        {
            name: '联盟广告',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideTop'
                }
            },
            data: [220, 182]
        },
        {
            name: '视频广告',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideTop'
                }
            },
            data: [150, 212]
        },
        {
            name: '搜索引擎',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideTop'
                }
            },
            data: [820, 832]
        }
    ]
};

      myChart.setOption(option);

      }
   },
   components: {}
 }
</script>

<style scoped>
#barChart {
  width: 42%;
  height: 300px;
}
</style>
