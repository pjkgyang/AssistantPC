<template>
  <div class="dp-errorpage">
    <div class="main-content" flex>
      <section col="1" center >
        <img src="static/img/san.png" alt>
      </section>
      <section col="1" flex-column spacearound>
        <div class="rightText" flex-column spacearound>
          <h2>页面好像丢失了，404！</h2>
          <hr>
          <div>
            <span class="fontGreen">
              页面即将
              <a href="/">跳转</a>
            </span>&#x3000;&#x3000;&#x3000;
            <span class="fontGreen">
              剩余
              <span class="fontRed">{{count}}</span> 秒
            </span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 5,
      timer: null
    };
  },
  mounted() {
    let _this = this;
    this.timer = setInterval(function() {
      _this.count--;
      if (_this.count <= 0) {
        clearInterval(_this.timer);
        _this.$router.push({ path: "/" });
      }
    }, 1000);
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.dp-errorpage {
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 50px 0;

  .main-content {
    width: 70%;
    height: 90%;
    margin: 0 auto;
    background: #d2f5f1;
  }
  .rightText {
    height: 150px;
    width: 350px;
    h2 {
      color: #f00;
      font-size: 40px;
      white-space: nowrap;
    }
    .fontGreen {
      font-size: 20px;
      color: #289575;
      font-weight: 700;
      .fontRed {
        color: #f00;
      }
      a {
        color: #4579e9;
        text-decoration: underline;
      }
      a:hover {
        color: #93b2f7;
      }
    }
  }
}
</style>
