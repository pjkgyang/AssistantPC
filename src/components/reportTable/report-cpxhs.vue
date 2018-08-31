<template>
    <div class="out-table">
        <table class="table table-cpxhx" border>
            <caption>产品线解决情况</caption>
            <thead> 
               <tr v-if="tableData.length != 0">
                    <th>产品线</th>
                    <th>{{tableData[0].xmtdjj}}</th>
                    <th>{{tableData[0].gczjjj}}</th>
                    <th>{{tableData[0].cpzjjj}}</th>
                    <th>{{tableData[0].zdrjj}}</th>
                    <th>{{tableData[0].xmtdhs}}</th>
                    <th>{{tableData[0].gczjhs}}</th>
                    <th>{{tableData[0].cpzjhs}}</th>
                    <th>{{tableData[0].zdrhs}}</th>
                    <th>{{tableData[0].hjhs}}</th>
                    <th>{{tableData[0].xmtdzfl}}</th>
                    <th>{{tableData[0].gczjzfl}}</th>
                    <th>{{tableData[0].dyz}}</th>
                    <th>{{tableData[0].wtzs}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(table,i) in [...tableData].splice(1, limit-1)" :key="i">
                    <td :title="table.cpxmc">{{table.cpxmc}}</td>
                    <td><a href="javaScript:void(0)" @click="handleCpx(table.cpxbh,'xmtdjj',table.xmtdjj)">{{table.xmtdjj}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleCpx(table.cpxbh,'gczjjj',table.gczjjj)">{{table.gczjjj}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleCpx(table.cpxbh,'cpzjjj',table.cpzjjj)">{{table.cpzjjj}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleCpx(table.cpxbh,'zdrjj',table.zdrjj)">{{table.zdrjj}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleCpx(table.cpxbh,'xmtdhs',table.xmtdhs)">{{table.xmtdhs}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleCpx(table.cpxbh,'gczjhs',table.gczjhs)">{{table.gczjhs}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleCpx(table.cpxbh,'cpzjhs',table.cpzjhs)">{{table.cpzjhs}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleCpx(table.cpxbh,'zdrhs',table.zdrhs)">{{table.zdrhs}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleCpx(table.cpxbh,'hjhs',table.hjhs)">{{table.hjhs}}</a></td>

                    <td><a href="javaScript:void(0)" @click="handleCpx(table.cpxbh,'xmtdzfl',table.xmtdzfl)">{{table.xmtdzfl}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleCpx(table.cpxbh,'gczjzfl',table.gczjzfl)">{{table.gczjzfl}}</a></td>

                    <td><a href="javaScript:void(0)" @click="handleCpx(table.cpxbh,'dyz',table.dyz)">{{table.dyz}}</a></td> 
                    <td><a href="javaScript:void(0)" @click="handleCpx(table.cpxbh,'wtzs',table.wtzs)">{{table.wtzs}}</a></td> 
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
   data(){
       return{
         limit:'',
         object:{}
       }
   },
    updated(){
        this.limit = this.tableData.length
    },

   mounted(){},
   methods:{
        handleCpx(cpxbh,data1,data2){
            this.object = {};
            this.object[data1] = data2
            this.object['cpxbh'] = cpxbh
            this.$emit('handleCpx',this.object);
       },
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
    width: 100%;
    overflow-x: auto;
}
.table{
    border: 1px solid #ddd;
    width: 1600px;
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
    height:58vh;
    width: 100%;
    overflow-y: scroll;
}
.table caption{
    border: 1px solid #ddd;
    border-bottom: none;
    text-align: center;
    background: #eee !important;
    font-size:18px;
    font-weight: 700;
    color: #000;
}
.table tr,.table th{
    height: 37px !important;
    text-align:center;
    border-right: 1px solid #ddd;
    padding: 0;
    margin: 0;
    vertical-align:middle;
}
.table td:first-child,.table th:first-child{
    width: 12%;
}
.table tr:last-child{
   border-bottom: 1px solid #ddd; 
}
.table td{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    border-right: 1px solid #ddd;
}
</style>
