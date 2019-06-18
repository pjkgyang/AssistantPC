<template>
    <div class="out-table">
        <table class="table table-top" border>
            <thead>
            <tr v-if="tableData2.length != 0">
                <th>{{tableData2[0].sj}}</th>
                <th>{{tableData2[0].cpxmc}}</th>
                <th>{{tableData2[0].dxmtdjj}}</th>
                <th>{{tableData2[0].dzjjj}}</th>
                <th>{{tableData2[0].dcpjj}}</th>
				<th>{{tableData2[0].dcpjljj}}</th>
                <th>{{tableData2[0].dzdrjj}}</th>
            </tr>
            </thead>
        </table>
        <div class="tbody-table table-wtxygz">
        <table class="table" border>
                <tr v-for="(table,i) in [...tableData2].splice(1, limit-1)" :key="i" v-if="tableData2.length != 0">
                    <td :rowspan="cpx" v-if="i%cpx==0">{{table.sj}}</td>
                    <td :title="table.cpxmc">{{table.cpxmc}}</td>
                    <td><a href="javaScript:void(0)" @click="handleWtxygz(table.cpxbh,table.sj,'dxmtdjj',table.dxmtdjj)">{{table.dxmtdjj}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleWtxygz(table.cpxbh,table.sj,'dzjjj',table.dzjjj)">{{table.dzjjj}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleWtxygz(table.cpxbh,table.sj,'dcpjj',table.dcpjj)">{{table.dcpjj}}</a></td>
					<td><a href="javaScript:void(0)" @click="handleWtxygz(table.cpxbh,table.sj,'dcpjljj',table.dcpjljj)">{{table.dcpjljj}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleWtxygz(table.cpxbh,table.sj,'dzdrjj',table.dzdrjj)">{{table.dzdrjj}}</a></td>
                </tr>
        </table>
        </div>
    </div>
</template>
<script>
export default {
   data(){
       return{
         thList:[],
         tdList:[],
         limit:'',
         ESwjjList:[],
         SBwjjList:[],
         WTwjjList:[],
         ESwxyList:[],
         SBwxyList:[],
         WTwxyList:[],
         object:{}
       }
   },
   updated(){
         this.limit = this.tableData2.length
   },
   mounted(){
        window.onerror = function(){return true;}
   },

   methods:{
      handleWtxygz(cpxbh,sj,data1,data2){
          this.object = {};
          this.object[data1] = data2
          this.object['cpxbh'] = cpxbh
          switch(sj){
              case '超24小时未响应':
              this.object['noResponseMore24H'] = data2;
              break;
              case '超48小时未响应':
              this.object['noResponseMore48H'] = data2;
              break;
              case '超5天未响应':
              this.object['noResponseMore5D'] = data2;
              break;
              case '超24小时未解决':
              this.object['noSolveMore24H'] = data2;
              break;
              case '超48小时未解决':
              this.object['noSolveMore48H'] = data2;
              break;
              case '超5天未解决':
              this.object['noSolveMore5D'] = data2;
              break;
              case '申请关闭':
              this.object['dyz'] = data2;
              break;
              default:
              break;
          }    
          this.$emit('handleWtxygz',this.object);   
      }

   },
   props:{
       tableData2:{
           type:Array,
           default:function(){
               return []
           }
       },
       cpx:{
           type:Number,
           default:0   
       }
   },
   watch:{
     
   }
}
</script>
<style scoped>
.table {
   border: 1px solid #ebeef5; 
   margin: 0;
}
.table.table-top{
    width: calc( 100% - 1.2em ) !important;
}

.table tr,.table th{
    height: 30px;
    text-align:center;
    border-bottom:1px solid #ebeef5;
}
.table th,table td{
    width:14.3%;
}
.table td{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.tbody-table{
    max-height:63vh;
    overflow-y: auto;
    margin-bottom: 20px;
}

</style>
