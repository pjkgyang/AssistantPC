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
            <a href="javaScript:;;" @click="handleCheckDetail(item.cpxbh,'2')" v-if="listIndex == index && item.gczj != '-'"><img src="static/img/pj.png" alt="">评价及查看</a>
          </p>
          <p class="item-cpzj textellipsis" :title="item.cpzj">
            {{item.cpzj}}
            <a href="javaScript:;;" @click="handleCheckDetail(item.cpxbh,'1')" v-if="listIndex == index && item.cpzj != '-'"><img src="static/img/pj.png" alt="">评价及查看</a>
          </p>
        </li>
      </div>
      <div v-if="!itemList.length" class="emptyContent">
        <img src="static/img/kong.png" alt="">
        <p>暂无数据</p>
      </div>
    </ul>

    <zjpjDialog :show.sync="zjpjShow" :tableData="tableData" @handlePraise="handlePraise"></zjpjDialog>
    <pjsmDialog :show.sync="pjsmShow" :title="title" @handleClickSure="handleClickSure"></pjsmDialog>
    
  </div>
</template>


<script>
import { downloadXmFile } from "@/api/TaskProcess.js";
import zjpjDialog from '@/components/dialog/resource/zjpj-dialog';
import pjsmDialog from '@/components/dialog/resource/pjsm-dialog';

export default {
  data() {
    return {
      zjpjShow:false,
      pjsmShow:false,
      itemList: [],
      fjbh: "",
      fjobj: {},
      baseUrl: null,
      listIndex: 9999,
      tableData:[],
      rylx:'',
      title:'',
      type:''//评价类型
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
    getExperts(cpxbh){
      this.$get(this.API.experts,{
        cpxbh:cpxbh,
        rylx:this.rylx
      }).then(res=>{
        if(res.state == 'success'){
           if(!res.data){
            this.tableData = []
           }else{
            this.tableData = res.data
           }
         }
      })
    },
    // 查看详情
    handleCheckDetail(params,data){
      this.rylx = data;
      this.getExperts(params);
      this.zjpjShow = !this.zjpjShow
    },
    // 
    handlePraise(params,type){
      this.xminfo = params;
      this.title = type == 1?"好评说明":'优化建议';
      this.type = type;
      this.pjsmShow = !this.pjsmShow
    },
    // 评价确定
    handleClickSure(sm){
       this.$post(this.type=='1'?this.API.expertgood:this.API.expertbad,{
        rylx:this.rylx,
        sm:sm,
        rybh:this.xminfo.bh,
        ryxm:this.xminfo.xm,
        cpxbh:this.xminfo.cpxbh,
        cpxmc:this.xminfo.cpx
      }).then(res=>{
        if(res.state == 'success'){
          this.pjsmShow = !this.pjsmShow
          this.$alert('评价成功', "提示", {confirmButtonText: "确定",type:'success',callback:action=>{
             this.getExperts(this.xminfo.cpxbh);
          }});
        }else{
          this.$alert(res.msg, "提示", {confirmButtonText: "确定",type:'error'});
        }
      })
    }
  },
  components:{zjpjDialog,pjsmDialog}
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