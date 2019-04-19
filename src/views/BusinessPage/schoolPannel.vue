<template>
  <div class="project-school">
    <div>
      <el-input
        style="width:500px;margin-bottom:20px"
        v-model="keyword"
        suffix-icon="el-icon-search"
        placeholder="请输入学校名称"
        @change="handleSearchSchool"
      ></el-input>
    </div>
    <div flex>
      <div v-for="item in schools" class="project-school_card" flex colcenter @click="handleCheckDetail(item.mc)">
        <div class="logo">
          <img :src="item.logo" :onerror="errorImg">
        </div>
        <h4>{{item.mc}}</h4>
      </div>
    </div>
    <div v-if="total == 0">
       <div style="width:100%;text-align:center;padding:20px 0;">
           <img src="static/img/kong.png" alt="" style="width:300px;">
           <p style="font-size:18px">暂 无 项 目</p>
       </div>
    </div>
    <div v-if="total > 0 && !!schools.length"> 
      <el-pagination background layout="total, sizes, prev, pager, next, jumper"  :current-page="currentPage" :page-size="pageSize" :page-sizes="[50, 100, 150, 200]" :total="total"
      @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      errorImg: 'this.src="' + require("../../../static/img/timg.png") + '"',
      schools: [],
      currentPage: 1,
      pageSize:50,
      total: 1,
      keyword: ""
    };
  },
  mounted() {
    this.getDwByUser();
  },
  methods: {
    handleCheckDetail(params){
      let { href } = this.$router.resolve({
        path: "/xxtsql",
        query: {dwmc:params}
      });
      window.open(href, "_blank");
    },
    handleSizeChange(data){
      this.currentPage = 1;
      this.pageSize = data;
      this.getDwByUser();
    },
    handleCurrentChange(data){
      this.currentPage = data;
      this.getDwByUser();
    },
    // 搜索
    handleSearchSchool() {
      this.getDwByUser();
    },
    getDwByUser() {
      this.$get(this.API.getDwByUser, {
        dwlx: "",
        curPage: this.currentPage,
        pageSize: this.pageSize,
        keyword: this.keyword
      }).then(res => {
        if (res.state == "success") {
          if (!res.data.rows) {
            this.schools = [];
          } else {
            this.schools = res.data.rows;
          }
            this.total = res.data.records;
        }
      });
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.project-school {
  width: 1260px;
  margin: 20px auto 0;
  padding: 20px;
  > div {
    flex-wrap: wrap;
  }
}
.project-school_card {
  width: 295px;
  margin: 0 10px 10px 0;
  background: #fff;
  padding: 10px;
  border-radius: 4px;
  transition: all 0.3s;
  &:hover {
    cursor: pointer;
    transform: translate3d(0, -2px, 0);
    background: linear-gradient(
      to right bottom,
      rgb(222, 243, 243),
      rgb(255, 255, 255)
    );
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
  img {
    width: 58px;
    height: 58px;
    border-radius: 50%;
  }
  h4 {
    padding: 0 10px;
    font-weight: 700;
		font-size: 14px;
  }
}
</style>
