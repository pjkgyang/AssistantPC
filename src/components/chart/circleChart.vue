<template>
    <div id="circleChart"></div>
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      chart: {}
    };
  },
  props: {
    mys: {
      type: Number,
      default: 10
    },
    bmys: {
      type: Number,
      default: 20
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  methods: {
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("circleChart"));
      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "horizontal",
          x: "center",
          data: [
            "产品化个性需求",
            "改进学校环境",
            "纳入产品改进",
            "加强学校培训",
          ]
        },
        series: [
          {
            name: "分布情况",
            type: "pie",
            selectedMode: "single",
            radius: [0, "30%"],
            label: {
              normal: {
                position: "inner"
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: "过保", selected: true },
              { value: 679, name: "在建" },
              { value: 1548, name: "售后" }
            ]
          },
          {
            name: "分布情况",
            type: "pie",
            radius: ["40%", "55%"],
            label: {
              normal: {
                formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
                backgroundColor: "#eee",
                borderColor: "#aaa",
                borderWidth: 1,
                borderRadius: 4,
                // shadowBlur:3,
                // shadowOffsetX: 2,
                // shadowOffsetY: 2,
                // shadowColor: '#999',
                // padding: [0, 7],
                rich: {
                  a: {
                    color: "#999",
                    lineHeight: 22,
                    align: "center"
                  },
                  // abg: {
                  //     backgroundColor: '#333',
                  //     width: '100%',
                  //     align: 'right',
                  //     height: 22,
                  //     borderRadius: [4, 4, 0, 0]
                  // },
                  hr: {
                    borderColor: "#aaa",
                    width: "100%",
                    borderWidth: 0.5,
                    height: 0
                  },
                  b: {
                    fontSize: 12,
                    lineHeight: 33
                  },
                  per: {
                    color: "#eee",
                    backgroundColor: "#334455",
                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              }
            },
            data: [
              { value: 335, name: "产品化个性需求" },
              { value: 310, name: "改进学校环境" },
              { value: 234, name: "纳入产品改进" },
              { value: 135, name: "加强学校培训" },
            ]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  },
  components: {}
};
</script>
<style lang="scss" scope>
#circleChart {
  width: 53%;
  height: 300px;
}
</style>