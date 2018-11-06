<template>
        <div class="out-table">
            <table class="table" border>
                <tr v-if="tableData.length != 0">
                    <th>区域名称</th>
                    <th>{{tableData[0].xxs}}</th>
                    <th>{{tableData[0].yjrxxs}}</th>
                    <th>{{tableData[0].wjrxxs}}</th>
                    <th>{{tableData[0].zcxxs}}</th>
                    <th>{{tableData[0].twxxs}}</th>
                    <th>{{tableData[0].hyxxs}}</th>
                    <th>{{tableData[0].twxxzb}}</th>
                    <th>{{tableData[0].hyxxszb}}</th>
                    <th>{{tableData[0].jrwsyxxs}}</th>
                    <th>{{tableData[0].xxyhs}}</th>
                    <th>{{tableData[0].xxwtyhs}}</th>
                    <th>{{tableData[0].xxhyyhs}}</th>
                    <th>{{tableData[0].xxtwyhszb}}</th>
                    <th>{{tableData[0].xxhyyhszb}}</th>
                    <th>{{tableData[0].jrwsyyhs}}</th>
                    <th>{{tableData[0].yjrxms}}</th>
                    <th>{{tableData[0].wjrxms}}</th>
                    <th>{{tableData[0].wtzs}}</th>
                    <th>{{tableData[0].sqgbwts}}</th>
                    <th>{{tableData[0].ylwts}}</th>
                    <th>{{tableData[0].ylwtbl}}</th>
                </tr>
                <tr v-for="(table,i) in [...tableData].splice(1, limit-1)" :key="i" v-if="tableData.length != 0">
                    <td  :title="table.qymc">{{table.qymc}}</td>

                    <td><a href="javaScript:void(0)" @click="handleQyxxyh(table.qybh,'xxs',table.xxs)">{{table.xxs}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleQyxxyh(table.qybh,'yjrxxs',table.yjrxxs)">{{table.yjrxxs}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleQyxxyh(table.qybh,'wjrxxs',table.wjrxxs)">{{table.wjrxxs}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleQyxxyh(table.qybh,'zcxxs',table.zcxxs)">{{table.zcxxs}}</a></td>
                   
                    <td><a href="javaScript:void(0)" @click="handleQyxxyh(table.qybh,'twxxs',table.twxxs)">{{table.twxxs}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleQyxxyh(table.qybh,'hyxxs',table.hyxxs)">{{table.hyxxs}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleQyxxyh(table.qybh,'twxxzb',table.twxxzb)">{{table.twxxzb}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleQyxxyh(table.qybh,'hyxxszb',table.hyxxszb)">{{table.hyxxszb}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleQyxxyh(table.qybh,'jrwsyxxs',table.jrwsyxxs)">{{table.jrwsyxxs}}</a></td>

                    <td><a href="javaScript:void(0)" @click="handleQyxxyh(table.qybh,'xxyhs',table.xxyhs)">{{table.xxyhs}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleQyxxyh(table.qybh,'xxwtyhs',table.xxwtyhs)">{{table.xxwtyhs}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleQyxxyh(table.qybh,'xxhyyhs',table.xxhyyhs)">{{table.xxhyyhs}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleQyxxyh(table.qybh,'xxtwyhszb',table.xxtwyhszb)">{{table.xxtwyhszb}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleQyxxyh(table.qybh,'xxhyyhszb',table.xxhyyhszb)">{{table.xxhyyhszb}}</a></td>

                    <td><a href="javaScript:void(0)" @click="handleQyxxyh(table.qybh,'jrwsyyhs',table.jrwsyyhs)">{{table.jrwsyyhs}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleQyxxyh(table.qybh,'yjrxms',table.yjrxms)">{{table.yjrxms}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleQyxxyh(table.qybh,'wjrxms',table.wjrxms)">{{table.wjrxms}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleQyxxyh(table.qybh,'wtzs',table.wtzs)">{{table.wtzs}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleQyxxyh(table.qybh,'sqgbwts',table.sqgbwts)">{{table.sqgbwts}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleQyxxyh(table.qybh,'ylwts',table.ylwts)">{{table.ylwts}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleQyxxyh(table.qybh,'ylwtbl',table.ylwtbl)">{{table.ylwtbl}}</a></td>
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
        handleQyxxyh(qybh,data1,data2){  
            this.object = {};
            this.object[data1] = data2;
            this.object['qybh'] = qybh;
            this.$emit('handleQyxxyh',this.object,data1);
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
