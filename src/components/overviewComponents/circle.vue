<template>
  <div class="circle">
    <svg xmlns="http://www.w3.org/200/svg" height="90" width="90">
      <circle cx="50%" cy="50%" :r="r" fill="none" :stroke="outerStroke" stroke-width="5" stroke-linecap="round" />
      <circle class="inner-circle" cx="50%" cy="50%" :r="r" fill="none" :stroke="innerStroke" stroke-width="5" :stroke-dasharray="strokeLength+',10000'" ref="innercircle"></circle>
    </svg>
    <div class="circle-intro" flex-column center>
      <span class="percent" :style="{color:innerStroke}">{{percent}}%</span>
      <span class="text" :style="{color:innerStroke}">{{text}}</span>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {}
  },
  props: {
    percent: {
      default: 30,
      type: Number
    },
    r: {
      default: 40,
      type: Number
    },
    outerStroke: {
      default: 'rgba(255,172,54,0.10)',
      type: String
    },
    innerStroke: {
      default: '#FFAC36',
      type: String
    },
    text:{
      default: '延期率',
      type: String
    }
  },
  computed: {
    strokeLength() {
      return this.percent * Math.floor(2 * Math.PI * this.r) / 100
    }
  },
  mounted() {
    this.draw()
  },
  methods: {
    draw() {
      // this.$refs.innercircle.style.transformOrigin ='center'
      // debugger
    }
  },
  components: {},
}

</script>
<style lang="scss">
.inner-circle {
  transition: stroke-dasharray .3s ease-in;
}

.circle {
  position: relative;
  width: 90px;
  height: 90px;
  text-align: center;
}

svg {
  transform-origin: center;
  transform: rotate(-90deg);
  margin:0 auto;
}

.circle-intro {
  position: absolute;
  top: 0;
  left: 0;
  bottom:0;
  right:0;
  text-align: center;
  font-size:12px;
}
.circle-intro .percent{
  font-weight: bold;
}
</style>
