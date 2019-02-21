<template>
 <div class="common-pannel">
   <iframe :src="redirectUrl" frameborder="0" id="bdIframe" width="100%" ref="iframe" ></iframe>
 </div>
</template>

<script>
export default {
  data() {
    return {
      redirectUrl:'https://www.qq.com'
    };
  },
  props:{

  },
  activated(){
    console.dir('diyici jiazai ')
    this.redirectUrl = this.$route.query.url
  },
  watch:{
    '$route':function(from,to){
      this.redirectUrl = from.query.url;
    }
  },
  mounted() {
    const oIframe = document.getElementById("bdIframe");
    const deviceHeight = document.documentElement.clientHeight;
    oIframe.style.height = Number(deviceHeight) - 90 + "px"; 
  },
  methods: {},
  components: {}
};
</script>

<style scoped>
.common-pannel{
  background:#fff;
  height: 100%;
}

</style>
