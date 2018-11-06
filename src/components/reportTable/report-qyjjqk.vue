<template>
    <div>
        <div style="overflow-x:auto;">
            <table class="table table-qyjjqk" border>
                <tr v-if="tableData.length != 0">
                    <th style="width:100px;">区域工程</th>
                    <th>{{tableData[0].qdjkrjj}}</th>
                    <th>{{tableData[0].xmtdjj}}</th>
                    <th>{{tableData[0].gczjjj}}</th>
                    <th>{{tableData[0].cpzjjj}}</th>
                    <th>{{tableData[0].zdrjj}}</th>
                    <th>{{tableData[0].qdjkrhs}}</th>
                    <th>{{tableData[0].xmtdhs}}</th>
                    <th>{{tableData[0].gczjhs}}</th>
                    <th>{{tableData[0].cpzjhs}}</th>
                    <th>{{tableData[0].zdrhs}}</th>
                    <th>{{tableData[0].hjhs}}</th>
                    <th>{{tableData[0].dyz}}</th>
                    <th>{{tableData[0].wtzs}}</th>
                </tr>
                <tr v-for="(table,i) in [...tableData].splice(1, limit-1)" :key="i" v-if="tableData.length != 0">
                    <td  :title="table.qymc">{{table.qymc}}</td>
                    <td><a href="javaScript:void(0)" @click="handleQyjjqk(table.qybh,'qdjkrjj',table.qdjkrjj)">{{table.qdjkrjj}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleQyjjqk(table.qybh,'xmtdjj',table.xmtdjj)">{{table.xmtdjj}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleQyjjqk(table.qybh,'gczjjj',table.gczjjj)">{{table.gczjjj}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleQyjjqk(table.qybh,'cpzjjj',table.cpzjjj)">{{table.cpzjjj}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleQyjjqk(table.qybh,'zdrjj',table.zdrjj)">{{table.zdrjj}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleQyjjqk(table.qybh,'qdjkrhs',table.qdjkrhs)">{{table.qdjkrhs}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleQyjjqk(table.qybh,'xmtdhs',table.xmtdhs)">{{table.xmtdhs}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleQyjjqk(table.qybh,'gczjhs',table.gczjhs)">{{table.gczjhs}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleQyjjqk(table.qybh,'cpzjhs',table.cpzjhs)">{{table.cpzjhs}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleQyjjqk(table.qybh,'zdrhs',table.zdrhs)">{{table.zdrhs}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleQyjjqk(table.qybh,'hjhs',table.hjhs)">{{table.hjhs}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleQyjjqk(table.qybh,'dyz',table.dyz)">{{table.dyz}}</a></td>  
                    <td><a href="javaScript:void(0)" @click="handleQyjjqk(table.qybh,'wtzs',table.wtzs)">{{table.wtzs}}</a></td>                                
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
         object:{}
       }
   },
   updated(){
        this.limit = this.tableData.length
   },

   methods:{
       handleQyjjqk(qybh,data1,data2){
            this.object = {};
            this.object[data1] = data2;
            this.object['qybh'] = qybh;
            this.$emit('handleQyjjqk',this.object);
       },
   },
   computed:{

   },
   props:{
       tableData:{
           type:Array,
           default:function(){
               return []
           }
       }
   }
}
</script>
<style scoped>
.table {
   border: 1px solid #ebeef5; 
}

.table tr,.table th{
    height: 30px;
    text-align:center;
}
.table td{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
</style>
