<template>
    <div class="pieChart"></div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      titleData:[]
    };
  },
  props:{
    pieData:{
      type:Array,
      default:()=>{
        return [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" }
          ]
      }
    },
    pieIndex:{
      type:Number,
      default:0
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
    this.pieData.forEach(ele=>{
      this.titleData.push(ele.name);
    })
  },
  methods: {
    initChart() {
      // 基于准备好的dom，初始化echarts实例;
      var myChart = echarts.init(document.getElementsByClassName("pieChart")[this.pieIndex]);

      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "horizontal",
          x:"center",
          data:this.titleData
        },
        calculable: true,
        series: [
          {
          //  color:['#D1D1D1','#0f0','#d2sd1s','#00f'],
            name: "访问来源",
            type: "pie",
            radius: ["40%", "55%"],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              },
              emphasis: {
                label: {
                  show: false,
                  position: "center",
                  textStyle: {
                    fontSize: "20",
                    fontWeight: "bold"
                  }
                }
              }
            },
            data: this.pieData
          }
        ]
      };

      myChart.setOption(option);
    }
  },
  components: {}
};
</script>

<style scoped>
.pieChart {
  width: 100%;
  height: 300px;
}
</style>
