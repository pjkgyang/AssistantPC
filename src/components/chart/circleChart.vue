<template>
    <div id="circleChart"></div>
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      chart: {},
      titleData: [],
      outerData: [],
      innerData: []
    };
  },
  props: {
    circledata: {
      type: Array,
      default: () => {
        return [
          { value: 335, name: "产品化个性需求" },
          { value: 310, name: "改进学校环境" },
          { value: 234, name: "纳入产品改进" },
          { value: 135, name: "加强学校培训" }
        ];
      }
    },
    circleinnerdata: {
      type: Array,
      default: () => {
        return [
          { value: 335, name: "过保", selected: true },
          { value: 679, name: "在建" },
          { value: 1548, name: "售后" }
        ];
      }
    }
  },
  mounted() {},
  watch: {
    // circledata:function(val){
    //   this.outerData = val;
    //   this.initChart();
    // },
    circleinnerdata: function(val) {
      this.circledata.forEach(ele => {
        this.titleData.push(ele.name);
      });
      this.outerData = this.circledata;
      this.innerData = val;
      this.initChart();
    }
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
          orient: "vertitle",
          x: "right",
          data: this.titleData
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
            data: this.innerData
          },
          {
            name: "分布情况",
            type: "pie",
            center: ["50%", "50%"],
            radius: ["50%", "65%"],
            label: {
              normal: {
                // {a|{a}}{abg|}\n{hr|}\n
                formatter: "  {b|{b}：}{c}  {per|{d}%}  ",
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
                    align: "center",
                    show: false
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
            labelLine: {
              normal: {
                show: true,
                length: 40
              }
            },
            data: this.outerData
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
  width: 100%;
  height: 330px;
}
</style>