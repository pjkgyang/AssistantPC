<template>
    <div class="out-table">
        <table class="table table-cpxygz" border>
            <caption>产品响应跟踪</caption>
            <thead>
                <tr v-if="tableData3.length != 0">
                    <th>分类</th>
                    <!-- <th v-for="th in thList">{{th.mc}}</th>     -->
                    <th>{{tableData3[0].noResponseMore24H}}</th>
                    <th>{{tableData3[0].noResponseMore48H}}</th>
                    <th>{{tableData3[0].noResponseMore5D}}</th>
                    <th>{{tableData3[0].cqwwjj}}</th>
                    <th>{{tableData3[0].ccnwjj}}</th>
                    <th>{{tableData3[0].noSolveMore24H}}</th>
                    <th>{{tableData3[0].noSolveMore48H}}</th>
                    <th>{{tableData3[0].noSolveMore5D}}</th>
                    <th>{{tableData3[0].cqw}}</th>
                    <th>{{tableData3[0].ccn}}</th>
                    <th>{{tableData3[0].dyz}}</th>
                    <th>{{tableData3[0].wtzs}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(table,i) in [...tableData3].splice(1, limit-1)" :key="i" v-if="tableData3.length != 0">
                    <td  :title="table.cpxmc">{{table.cpxmc}}</td>
                    <td><a href="javascript:void(0)" @click="handleCpxygz(table.cpxbh,'noResponseMore24H',table.noResponseMore24H)">{{table.noResponseMore24H}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleCpxygz(table.cpxbh,'noResponseMore48H',table.noResponseMore48H)">{{table.noResponseMore48H}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleCpxygz(table.cpxbh,'noResponseMore5D',table.noResponseMore5D)">{{table.noResponseMore5D}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleCpxygz(table.cpxbh,'cqwwjj',table.cqwwjj)">{{table.cqwwjj}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleCpxygz(table.cpxbh,'ccnwjj',table.ccnwjj)">{{table.ccnwjj}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleCpxygz(table.cpxbh,'noSolveMore24H',table.noSolveMore24H)">{{table.noSolveMore24H}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleCpxygz(table.cpxbh,'noSolveMore48H',table.noSolveMore48H)">{{table.noSolveMore48H}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleCpxygz(table.cpxbh,'noSolveMore5D',table.noSolveMore5D)">{{table.noSolveMore5D}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleCpxygz(table.cpxbh,'cqw',table.cqw)">{{table.cqw}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleCpxygz(table.cpxbh,'ccn',table.ccn)">{{table.ccn}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleCpxygz(table.cpxbh,'dyz',table.dyz)">{{table.dyz}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleCpxygz(table.cpxbh,'wtzs',table.wtzs)">{{table.wtzs}}</a></td>
                </tr>
            </tbody>
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
        this.limit = this.tableData3.length
   },
   mounted(){
        window.onerror = function(){return true;}
   },
   methods:{
        handleCpxygz(cpxbh,data1,data2){  
            this.object = {};
            this.object[data1] = data2
            this.object['cpxbh'] = cpxbh
            this.$emit('handleCpxygz',this.object);
        }
   },
   props:{
       tableData3:{
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
   border: 1px solid #ddd; 
}
.table thead {
    width: calc( 100% - 1.2em ) !important;
}
.table thead, tbody tr {
    display:table;
    width:100%;
    table-layout:fixed;
}
.table tbody{
    display: block;
    height:57vh;
    width: 100%;
    overflow-y: scroll;
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
    vertical-align:middle;
}
.table td:first-child,.table th:first-child{
    width: 15%;
}
.table td{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
</style>
