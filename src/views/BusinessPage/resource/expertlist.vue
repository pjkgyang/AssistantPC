<template>
    <div style="width:80%;margin:10px auto 0;padding:20px 10px;background:#fff;border-radius:5px;box-shadow:0 0 5px #ccc;">
        <ul class="item-list">
            <div class="item-header" flex spacebetween>
                <p class="item-name">产品线</p>
                <p class="item-size">工程专家</p>
                <p class="item-cpzj" >产品专家</p>
            </div>
            <div class="list_content" v-if="itemList.length">
                <li v-for="(item,index) in itemList" flex spacebetween>
                    <p class="item-name textellipsis" :title="item.cpx">{{item.cpxmc}}</p>
                    <p class="item-size textellipsis" :title="item.gczj">{{item.gczj}}</p>
                    <p class="item-cpzj textellipsis" :title="item.cpzj">{{item.cpzj}}</p>
                </li>
            </div>
            <div v-if="!itemList.length" class="emptyContent">
                <img src="static/img/kong.png" alt="">
                <p>暂无数据</p>
            </div>
        </ul>
    </div>
</template>


<script>
import { downloadXmFile } from "@/api/TaskProcess.js";
export default {
  data() {
    return {
      itemList: [],
      fjbh: "",
      fjobj: {},
      baseUrl: null
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
        curPage:1,
        pageSize:99
      }).then(res => {
        if (res.state == "success") {
          if (!res.data.rows || !res.data) {
            this.itemList = [];
          } else {
            this.itemList = res.data.rows;
          }
        }
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.item-list{
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
  }

  .item-name {
    width: 20%;
    text-align: center;
  }
  .item-size {
    width: 37%;
    text-align: center;
  }
  .item-cpzj {
    width: 37%;
    text-align: center;
  }
}
</style>