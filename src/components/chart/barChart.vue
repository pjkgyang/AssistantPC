<template>
    <div class="barChart"></div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      firstName: "",
      firstValue: "",
      secondName: "",
      secondValue: "",
      thirdName: "",
      thirdValue: "",
      fourName: "",
      fourValue: "",

      titleData: []
    };
  },
  props: {
    barIndex: {
      type: Number,
      default: 0
    },
    barTitle: {
      type: String,
      default: "项目分类"
    },
    barData: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  watch: {
    barData: function(val) {
      this.firstName = val[0].name;
      this.secondName = val[1].name;
      this.thirdName = val[2].name;

      this.firstValue = val[0].value;
      this.secondValue = val[1].value;
      this.thirdValue = val[2].value;
      if (this.barTitle == "问题分类") {
        this.fourName = val[3].name;
        this.fourValue = val[3].value;
      }
      this.bardata = val;
      val.forEach(ele => {
        this.titleData.push(ele.name);
      });
      this.initChart();
    }
  },
  methods: {
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(
        document.getElementsByClassName("barChart")[this.barIndex]
      );
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: this.titleData
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        yAxis: {
          type: "value"
        },
        xAxis: {
          type: "category",
          data: [this.barTitle]
        },
        series: [
          {
            name: this.firstName,
            type: "bar",
            stack: "总量",
            barWidth: 80,
            label: {
              normal: {
                show: true,
                position: "insideTop"
              }
            },
            data: [this.firstValue]
          },
          {
            name: this.secondName,
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "insideTop"
              }
            },
            data: [this.secondValue]
          },
          {
            name: this.thirdName,
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "insideTop"
              }
            },
            data: [this.thirdValue]
          },
          {
            name: this.fourName,
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "insideTop"
              }
            },
            data: [this.fourValue]
          }
        ]
      };

      if (this.barTitle == "问题分类") {
        delete option[3];
      }
      myChart.setOption(option);
    }
  },
  components: {}
};
</script>

<style scoped>
.barChart {
  width: 25%;
  height: 300px;
}
</style>
