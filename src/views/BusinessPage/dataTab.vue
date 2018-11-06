<template>
  
<!-- <div style="position: relative;height:100%;"> -->
   <div class="project_toubiao">
     <div>
        <busy-nav 
        @dropdownSelect="handleSelect" 
        @dropdownSelectTwo="handleSelectT" 
        @dropdownSelectThree="handleSelectTh"
        @dropdownSelectFour="handleSelectF"></busy-nav> 
     </div>
    <div class="item_dataTab">
        <item-card v-for="(data,index) in datas" :cardData="data" :data-fbbh="data.fbbh" :key="index" @handleFBdetails="handleFBdetails"></item-card>
        <div style="text-align:center;width:100%;height:100%;padding-top:10%;" v-if="datas.length == 0">
              <img src="static/img/empty.png" alt=""><br><br>
              <p>暂 无 项 目</p>
        </div>
         <div style="text-align:right;position:absolute;bottom:-20px;right:15px">
        <pagination v-if="totalPage != 1 && total != 0 && totalPage != null" :pageSize="pageSize" :total="total" @handleCurrentChange="handleCurrentChange"></pagination>
      </div>
   </div>
   
  </div>

</template>
<script>
import busyNav from '@/components/BusinessPage/businessPageNav.vue'
import itemCard from '@/components/BusinessPage/itemCard.vue'
import pagination from '@/components/BusinessPage/pagination.vue'
import { EventBus } from '../../utils/util.js'; 
import {queryTbxx} from '@/api/toubiao.js'

export default {
  data(){
    return{
          datas:[],     
          curPage:1,
          pageSize:12,
          total:null,
          keyword:"",
          gczd:"",
          zbzt:"01",
          fbxz:"",
          zzdy:"",
          sfgx:"",
          totalPage:null

    }
  },
   mounted(){
      this.queryTbxx(this.curPage,this.pageSize);
      	EventBus.$on('searchInfo',(param)=>{
          this.keyword = param
          this.queryTbxx(1);
				})
   },
  methods:{
    // 工程战队
   handleSelect(data){
      this.gczd = data;
      this.queryTbxx(1);
   },
  //  分包性质
   handleSelectT(data){
      this.fbxz = data;
      this.queryTbxx(1);
   },
  // 分包状态
   handleSelectTh(data){
      this.zbzt = data;
      this.queryTbxx(1);
   },
  //  购销合同
   handleSelectF(data){ 
      this.sfgx = data;
      this.queryTbxx(1);
   },
   handleFBdetails(data){   //跳转到分包详情
      // this.$router.push({name:'FBdetail',params:{data:data}});
      sessionStorage.setItem('fbData',JSON.stringify(data));
       let routeData = this.$router.resolve({
        path: '/businesspage/fbdetail',
        query:{}
      });
      window.open(routeData.href, "_blank");
   },
   handleCurrentChange(data){
      this.queryTbxx(data);

   },
  queryTbxx(curPage){
     queryTbxx({
          curPage:curPage,
          pageSize:12,
          keyword:this.keyword||"",
          gczd:this.gczd||"",
          zbzt:this.zbzt||"",
          fbxz:this.fbxz||"",
          zzdy:this.zzdy||"",
          sfgx:this.sfgx||""
        }).then(({data})=>{
          if(data.state =='success'){
            this.datas = data.data.rows
            this.total = data.data.records
            this.totalPage = data.data.total
            
          }else{
             this.$message(data.msg);
          }
        
        })
  }

  },
  //监听$emit的oneChange事件   关键字
   created(){      
			
			},
  components:{itemCard,busyNav,pagination}
}
</script>
<style scoped>
.project_toubiao{
  width: 1300px;
  margin: 0 auto;
  height:calc(100vh - 80px);
  box-shadow: 0 0 5px #999;
  overflow-x: hidden;
  background: #fff;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

}

.item_dataTab{
  padding-left:16px;
  display: flex;
  flex-wrap: wrap;
  position:relative;

}
.item_dataTab::after{
  content: "";
  display: block;
  clear: both;
}
</style>
