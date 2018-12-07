<template>
  <div style="width:80%;margin:10px auto 0;padding:20px 10px;background:#fff;border-radius:5px;box-shadow:0 0 5px #ccc;">
    <ul class="item-list">
      <div class="item-header" flex spacebetween>
        <p class="item-name">产品线</p>
        <p class="item-size">工程专家</p>
        <p class="item-cpzj">产品专家</p>
      </div>
      <div class="list_content" v-if="itemList.length">
        <li v-for="(item,index) in itemList" flex spacebetween @mouseover="listIndex = index">
          <p class="item-name textellipsis" :title="item.cpx">{{item.cpxmc}}</p>
          <p class="item-size textellipsis" :title="item.gczj">{{item.gczj}}
            <!-- <a href="javaScript:;;" @click="handleCheckDetail(item.cpxbh,'1')" v-if="listIndex == index && item.gczj != '-'"><img src="static/img/pj.png" alt="">评价及查看</a> -->
          </p>
          <p class="item-cpzj textellipsis" :title="item.cpzj">
            {{item.cpzj}}
            <!-- <a href="javaScript:;;" @click="handleCheckDetail(item.cpxbh,'2')" v-if="listIndex == index && item.cpzj != '-'"><img src="static/img/pj.png" alt="">评价及查看</a> -->
          </p>
        </li>
      </div>
      <div v-if="!itemList.length" class="emptyContent">
        <img src="static/img/kong.png" alt="">
        <p>暂无数据</p>
      </div>
    </ul>

    <zjpjDialog :show.sync="zjpjShow"></zjpjDialog>
  </div>
</template>


<script>
import { downloadXmFile } from "@/api/TaskProcess.js";
import zjpjDialog from '@/components/dialog/resource/zjpj-dialog'
export default {
  data() {
    return {
      zjpjShow:false,
      itemList: [],
      fjbh: "",
      fjobj: {},
      baseUrl: null,
      listIndex: ""
    };
  },
  props: {
    xmbh: {
      type: String,
      default: ""
    }
  },
  mounted() {
    this.baseUrl = window.baseurl;
    this.queryCpxZjData();
  },

  methods: {
    queryCpxZjData(path) {
      this.$get(this.API.queryCpxZjData, {
        curPage: 1,
        pageSize: 99
      }).then(res => {
        if (res.state == "success") {
          if (!res.data.rows || !res.data) {
            this.itemList = [];
          } else {
            this.itemList = res.data.rows;
          }
        }
      });
    },
    handleCheckDetail(params,data){
      this.zjpjShow = !this.zjpjShow
    }
  },
  components:{zjpjDialog}
};
</script>


<style lang="scss" scoped>
.item-list {
  .list_content {
    max-height: calc(100vh - 200px);
    overflow-y: auto;
  }
  li {
    border-bottom: 1px solid #ccc;
    font-size: 14px;
    width: 100%;
    padding: 10px 0;

    div:after {
      content: "";
      display: block;
      clear: both;
    }
    &:hover {
      background: rgba(174, 192, 194, 0.2);
    }
  }
  .item-header {
    padding: 10px 0;
    color: #888;
    border-bottom: 1px solid #ccc;
    font-weight: 700;
    width: calc(100% - 16px);
  }

  .item-name {
    width: 20%;
    text-align: center;
  }
  .item-size {
    width: 37%;
    text-align: center;
  }
  .textellipsis {
    a {
      border-radius: 3px;
      background: rgba(26, 170, 163, 0.2);
      padding: 2px 4px;
    }
    img {
      width: 18px;
      height: 18px;
    }
  }
  .item-cpzj {
    width: 37%;
    text-align: center;
  }
}
</style>