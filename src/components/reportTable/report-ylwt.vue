<template>
    <div class="out-table">
        <table class="table" border>
            <caption>问题受理人跟踪</caption>
            <tr v-if="tableData.length != 0">
                <th>分类</th>
                <!-- <th v-for="th in thList">{{th.mc}}</th>     -->
                <th>{{tableData[0].noResponseMore24H}}</th>
                <th>{{tableData[0].noResponseMore48H}}</th>
                <th>{{tableData[0].noResponseMore5D}}</th>
                <th>{{tableData[0].cqwwjj}}</th>
                <th>{{tableData[0].ccnwjj}}</th>
                <th>{{tableData[0].noSolveMore24H}}</th>
                <th>{{tableData[0].noSolveMore48H}}</th>
                <th>{{tableData[0].noSolveMore5D}}</th>
                <th>{{tableData[0].cqw}}</th>
                <th>{{tableData[0].ccn}}</th>
                <th>{{tableData[0].dyz}}</th>
            </tr>
            <tr v-for="(table,i) in [...tableData].splice(1, limit-1)" :key="i" v-if="tableData.length != 0">
                <td :title="table.lcmc">{{table.lcmc}}</td>
 
                <td><a href="javaScript:void(0)" @click="handleWtslrgz(table.lcbh,'noResponseMore24H',table.noResponseMore24H)">{{table.noResponseMore24H}}</a></td>
                <td><a href="javaScript:void(0)" @click="handleWtslrgz(table.lcbh,'noResponseMore48H',table.noResponseMore48H)">{{table.noResponseMore48H}}</a></td>
                <td><a href="javaScript:void(0)" @click="handleWtslrgz(table.lcbh,'noResponseMore5D',table.noResponseMore5D)">{{table.noResponseMore5D}}</a></td>
                <td><a href="javaScript:void(0)" @click="handleWtslrgz(table.lcbh,'cqwwjj',table.cqwwjj)">{{table.cqwwjj}}</a></td>
                <td><a href="javaScript:void(0)" @click="handleWtslrgz(table.lcbh,'ccnwjj',table.ccnwjj)">{{table.ccnwjj}}</a></td>
                <td><a href="javaScript:void(0)" @click="handleWtslrgz(table.lcbh,'noSolveMore24H',table.noSolveMore24H)">{{table.noSolveMore24H}}</a></td>
                <td><a href="javaScript:void(0)" @click="handleWtslrgz(table.lcbh,'noSolveMore48H',table.noSolveMore48H)">{{table.noSolveMore48H}}</a></td>
                <td><a href="javaScript:void(0)" @click="handleWtslrgz(table.lcbh,'noSolveMore5D',table.noSolveMore5D)">{{table.noSolveMore5D}}</a></td>
                <td><a href="javaScript:void(0)" @click="handleWtslrgz(table.lcbh,'cqw',table.cqw)">{{table.cqw}}</a></td>
                <td><a href="javaScript:void(0)" @click="handleWtslrgz(table.lcbh,'ccn',table.ccn)">{{table.ccn}}</a></td>
                <td><a href="javaScript:void(0)" @click="handleWtslrgz(table.lcbh,'dyz',table.dyz)">{{table.dyz}}</a></td>
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
        handleWtslrgz(lcbh,data1,data2){  
            this.object = {};
            this.object[data1] = data2
            this.object['lcbh'] = lcbh
            this.$emit('handleWtslrgz',this.object);
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
   }
}
</script>
<style scoped>
.out-table{
    overflow-x: auto;
    width:100%
}
.table {
   border: 1px solid #ddd; 
}
.table caption{
    border: 1px solid #ddd;
    border-bottom: none;
    text-align: center;
    background: #eee;
    font-size:18px;
    font-weight: 700;
    color: #000;
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
