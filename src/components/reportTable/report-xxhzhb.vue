<template>
        <div class="out-table">
            <table class="table" border>
                <caption>{{title}}</caption>
                <tr v-if="tableData.length != 0">
                    <th style="width:100px;">分类</th>
                    <th>{{tableData[0].xzwt}}</th>
                    <th>{{tableData[0].drjjwt}}</th>
                    <th>{{tableData[0].drylwt}}</th>
                    <th>{{tableData[0].dxmtdjj}}</th>
                    <th>{{tableData[0].dzjjj}}</th>
                    <th>{{tableData[0].dcpjj}}</th>
                    <th>{{tableData[0].dyz}}</th>
                    <th>{{tableData[0].wtzs}}</th>
                    <th>{{tableData[0].ylbl}}</th>
                    <th>{{tableData[0].cqwwjj}}</th>
                    <th>{{tableData[0].ccnwjj}}</th>
                    <th>{{tableData[0].noResponseMore24H}}</th>
                    <th>{{tableData[0].noResponseMore48H}}</th>
                    <th>{{tableData[0].noResponseMore5D}}</th>
                    <th>{{tableData[0].noSolveMore24H}}</th>
                    <th>{{tableData[0].noSolveMore48H}}</th>
                    <th>{{tableData[0].noSolveMore5D}}</th>
                    <th>{{tableData[0].cqw}}</th>
                    <th>{{tableData[0].ccn}}</th>
                </tr>
                <tr v-for="(table,i) in [...tableData].splice(1, limit-1)" :key="i" v-if="tableData.length != 0">
                    <td  :title="table.dwmc==''?table.qymc:table.dwmc">{{table.dwmc==""?table.qymc:table.dwmc}}</td>

                    <td><a href="javaScript:void(0)" @click="handleXxwt(table.dwbh,table.qybh,'xzwt',table.xzwt)">{{table.xzwt}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleXxwt(table.dwbh,table.qybh,'drjjwt',table.drjjwt)">{{table.drjjwt}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleXxwt(table.dwbh,table.qybh,'drylwt',table.drylwt)">{{table.drylwt}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleXxwt(table.dwbh,table.qybh,'dxmtdjj',table.dxmtdjj)">{{table.dxmtdjj}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleXxwt(table.dwbh,table.qybh,'dzjjj',table.dzjjj)">{{table.dzjjj}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleXxwt(table.dwbh,table.qybh,'dcpjj',table.dcpjj)">{{table.dcpjj}}</a></td>

                    <td><a href="javaScript:void(0)" @click="handleXxwt(table.dwbh,table.qybh,'dyz',table.dyz)">{{table.dyz}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleXxwt(table.dwbh,table.qybh,'wtzs',table.wtzs)">{{table.wtzs}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleXxwt(table.dwbh,table.qybh,'ylbl',table.ylbl)">{{table.ylbl}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleXxwt(table.dwbh,table.qybh,'cqwwjj',table.cqwwjj)">{{table.cqwwjj}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleXxwt(table.dwbh,table.qybh,'ccnwjj',table.ccnwjj)">{{table.ccnwjj}}</a></td>

                    <td><a href="javaScript:void(0)" @click="handleXxwt(table.dwbh,table.qybh,'noResponseMore24H',table.noResponseMore24H)">{{table.noResponseMore24H}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleXxwt(table.dwbh,table.qybh,'noResponseMore48H',table.noResponseMore48H)">{{table.noResponseMore48H}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleXxwt(table.dwbh,table.qybh,'noResponseMore5D',table.noResponseMore5D)">{{table.noResponseMore5D}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleXxwt(table.dwbh,table.qybh,'noSolveMore24H',table.noSolveMore24H)">{{table.noSolveMore24H}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleXxwt(table.dwbh,table.qybh,'noSolveMore48H',table.noSolveMore48H)">{{table.noSolveMore48H}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleXxwt(table.dwbh,table.qybh,'noSolveMore5D',table.noSolveMore5D)">{{table.noSolveMore5D}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleXxwt(table.dwbh,table.qybh,'cqw',table.cqw)">{{table.cqw}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleXxwt(table.dwbh,table.qybh,'ccn',table.ccn)">{{table.ccn}}</a></td>
                </tr>
            </table>
        </div>
</template>
<script>
export default {
   data(){
       return{
         thList:[],
         tdList:[],
         limit:'',
         object:{}
       }
   },
   updated(){
        this.limit = this.tableData.length
   },
   methods:{
        handleXxwt(dwbh,qybh,data1,data2){  
            this.object = {};
            this.object[data1] = data2
            this.object[dwbh==''?'qybh':'dwbh'] = (dwbh==''?qybh:dwbh)
            this.$emit('handleXxwt',this.object);
        }
   },
   computed:{

   },
   props:{
       tableData:{
           type:Array,
           default:function(){
               return []
           }
       },
       title:{
          type:String,
          default:'学校合作伙伴'    
       }
   }
}
</script>
<style scoped>
.out-table{
    overflow-x: auto;
    width: 100%;
}
.table {
   border: 1px solid #ebeef5; 
   margin-bottom: 10px !important;
}
.table caption{
    border: 1px solid #ebeef5;
    border-bottom: none;
    text-align: center;
    background: #f5f7fa;
    font-size:18px;
    font-weight: 700;
    color: #909399;
}
.table tr,.table th{
    height: 30px;
    text-align:center;
    white-space: nowrap;
    padding: 0 10px;
}
.table td{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 0 10px;
}
</style>
