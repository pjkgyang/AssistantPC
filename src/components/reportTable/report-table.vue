<template>
    <div class="out-table">
        <table class="table table-wtgz" border>
            <thead> 
                <tr>
                    <th v-for="th in thList" >{{th.name}}</th>    
                </tr>
            </thead>
            <tbody>
                <tr v-for="(table,i) in tableData" :key="i">
                    <td :title="table.cpxmc">{{table.cpxmc}}</td>
                    <td><a href="javaScript:void(0)" @click="handleWtgz(table.cpxbh,'xzwt',table.xzwt)">{{table.xzwt}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleWtgz(table.cpxbh,'drjjwt',table.drjjwt)">{{table.drjjwt}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleWtgz(table.cpxbh,'drylwt',table.drylwt)">{{table.drylwt}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleWtgz(table.cpxbh,'dxmtdjj',table.dxmtdjj)">{{table.dxmtdjj}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleWtgz(table.cpxbh,'dzjjj',table.dzjjj)">{{table.dzjjj}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleWtgz(table.cpxbh,'dcpjj',table.dcpjj)">{{table.dcpjj}}</a></td>
					<td><a href="javaScript:void(0)" @click="handleWtgz(table.cpxbh,'dcpjljj',table.dcpjljj)">{{table.dcpjljj}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleWtgz(table.cpxbh,'dzdrjj',table.dzdrjj)">{{table.dzdrjj}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleWtgz(table.cpxbh,'dgb',table.dgb)">{{table.dgb}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleWtgz(table.cpxbh,'wtzs',table.wtzs)">{{table.wtzs}}</a></td>
                    <td><a href="javaScript:void(0)" @click="handleWtgz(table.cpxbh,'ylbl',table.ylbl)">{{table.ylbl}}</a></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
   data(){
       return{
         thList:[{
           name:'分类',
           label:''
         },{
           name:'每日新增问题',
           label:'xzwt'
         },{
           name:'每日已解决问题',
           label:'drjjwt'
         },{
           name:'截止今日遗留问题',
           label:'drylwt'
         },{
           name:'待项目团队解决',
           label:'dxmtdjj'
         },{
           name:'待专家解决',
           label:'dzjjj'
         },{
		   name:'待产品解决',
		   label:'dcpjj'
		 },{
           name:'待产品经理解决',
           label:'dcpjljj'
         },{
           name:'待指定人解决',
           label:'dzdrjj'
         },{
           name:'申请关闭',
           label:'dgb'
         },{
           name:'总问题数',
           label:'wtzs'
         },{
           name:'遗留问题比例',
           label:'ylbl'
         }],
         object:{}
       }
   },
   mounted(){
       
   },
   methods:{
        handleWtgz(cpxbh,data1,data2){
            this.object = {};
            this.object[data1] = data2
            this.object['cpxbh'] = cpxbh
            this.$emit('handleWtgz',this.object);
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
    height:64vh;
    width: 100%;
    overflow-y: scroll;
}

.table tr,.table th{
    height: 37px !important;
    text-align:center;
    border-right: 1px solid #ebeef5;
    padding: 0;
    margin: 0;
    vertical-align:middle;
    border-bottom:1px solid #ebeef5;
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
