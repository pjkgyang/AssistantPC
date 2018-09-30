<template>
    <div class="out-table">
        <table class="table table-wtlxtj" border>
            <caption>问题类型统计</caption>
            <thead> 
               <tr v-if="tableData.length != 0">
                    <th>产品线</th>
                    <th>{{tableData[0].hjpc}}</th>
                    <th>{{tableData[0].cpbug}}</th>
                    <th>{{tableData[0].rzjc}}</th>
                    <th>{{tableData[0].jkpc}}</th>
                    <th>{{tableData[0].sjjc}}</th>
                    <th>{{tableData[0].sjzc}}</th>
                    <th>{{tableData[0].xq}}</th>
                    <th>{{tableData[0].azbs}}</th>
                    <th>{{tableData[0].sycz}}</th>
                    <th>{{tableData[0].zjj}}</th>
                    <th>{{tableData[0].wlwt}}</th>
                    <th>{{tableData[0].pzwj}}</th>
                    <th>{{tableData[0].zzdyyj}}</th>
                    <th>{{tableData[0].aqld}}</th>
                    <th>{{tableData[0].sjcl}}</th>
                    <th>{{tableData[0].xcbz}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(table,i) in [...tableData].splice(1, limit-1)" :key="i">
                    <td :title="table.cpxmc">{{table.cpxmc}}</td>
                    <td><a href="javaScript:void(0)" @click="handleWtlxtj(table.cpxbh,'hjpc',table.hjpc)">{{table.hjpc}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleWtlxtj(table.cpxbh,'cpbug',table.cpbug)">{{table.cpbug}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleWtlxtj(table.cpxbh,'rzjc',table.rzjc)">{{table.rzjc}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleWtlxtj(table.cpxbh,'jkpc',table.jkpc)">{{table.jkpc}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleWtlxtj(table.cpxbh,'sjjc',table.sjjc)">{{table.sjjc}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleWtlxtj(table.cpxbh,'sjzc',table.sjzc)">{{table.sjzc}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleWtlxtj(table.cpxbh,'xq',table.xq)">{{table.xq}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleWtlxtj(table.cpxbh,'azbs',table.azbs)">{{table.azbs}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleWtlxtj(table.cpxbh,'sycz',table.sycz)">{{table.sycz}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleWtlxtj(table.cpxbh,'zjj',table.zjj)">{{table.zjj}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleWtlxtj(table.cpxbh,'wlwt',table.wlwt)">{{table.wlwt}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleWtlxtj(table.cpxbh,'pzwj',table.pzwj)">{{table.pzwj}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleWtlxtj(table.cpxbh,'zzdyyj',table.zzdyyj)">{{table.zzdyyj}}</a></td> 
                    <td><a href="javaScript:void(0)" @click="handleWtlxtj(table.cpxbh,'aqld',table.aqld)">{{table.aqld}}</a></td> 
                    <td><a href="javaScript:void(0)" @click="handleWtlxtj(table.cpxbh,'sjcl',table.sjcl)">{{table.sjcl}}</a></td> 
                    <td><a href="javaScript:void(0)" @click="handleWtlxtj(table.cpxbh,'xcbz',table.xcbz)">{{table.xcbz}}</a></td> 
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

   mounted(){
       
   },
   methods:{
        handleWtlxtj(cpxbh,data1,data2){
            this.object = {};
            this.object[data1] = data2
            this.object['cpxbh'] = cpxbh
            this.$emit('handleWtlxtj',this.object);
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

.table{
    border: 1px solid #ebeef5;
    width: 100%;

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
    height:62vh;
    width: 100%;
    overflow-y: scroll;
}
.table caption{
    border: 1px solid #ebeef5;
    border-bottom: none;
    text-align: center;
    background: #f5f7fa !important;
    font-size:18px;
    font-weight: 700;
    color: #909399;
}
.table tr,.table th{
    height: 37px !important;
    text-align:center;
    border-right: 1px solid #ebeef5;
    padding: 0;
    margin: 0;
    vertical-align:middle;
}
.table td:first-child,.table th:first-child{
    width: 12%;
}
.table tr:last-child{
   border-bottom: 1px solid #ebeef5; 
}
.table td{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    border-right: 1px solid #ebeef5;
}
</style>
