<template>
 <div>
      <el-dialog
            title="发送消息"
            width="700px"
            top="30px"
            :visible.sync="visible"
            :append-to-body="true"
            :close-on-click-modal="false"
            @close="$emit('update:show', false)"
            :show="show">
            <div class="send-msg">
                <div>
                    <span class="filter-weight before-require">发送内容:</span>
                    <span><el-input type="textarea" :maxlength='300'  :rows="4"  placeholder="请输入内容(最多300字)" v-model="dataObj.content"></el-input></span>
                </div><br>
                <div>
                    <span class="filter-weight">发送对象:</span>
                     <el-table
                            ref="multipleTable"
                            :data="tableData"
                            tooltip-effect="dark"
                            style="width: 100%"
                            height="400"
                            border
                            @selection-change="handleSelectionChange">
                            <el-table-column type="selection"  width="55"></el-table-column>
                            <el-table-column prop="roleName"  label="角色"  show-overflow-tooltip></el-table-column>
                            <el-table-column prop="userName"  label="姓名"  show-overflow-tooltip></el-table-column>
                            <el-table-column prop="userCode"  label="工号/手机号"  show-overflow-tooltip></el-table-column>
                            <el-table-column prop="unitName"  label="单位类型"  show-overflow-tooltip></el-table-column>
                       </el-table>
                </div>
                <div style="text-align:right;padding:10px ">
                    <el-button size="small" @click="handleClose">取消</el-button>
                    <el-button size="small" type="primary" @click="handleSure">确定</el-button>
                </div>
            </div>
        </el-dialog>
 </div>
</template>

<script>
 export default {
   data () {
     return {
         visible:this.show,
         multipleSelest:[],
         dataObj:{
             content:'',
             userids:[]
         }
     }
   },
   methods:{
       handleSelectionChange(val){
          this.dataObj.userids = [];
          this.multipleSelest = val;
          this.multipleSelest.forEach(element => {
              this.dataObj.userids.push(element.userId)
          });
       },
       handleClose(){
           this.visible = false;   
       },
       handleSure(){ 
           if(!this.dataObj.content){
                this.$alert('请输入发送内容', '提示', {confirmButtonText: '确定',type:'warning'});
                return;
           }else if(!this.multipleSelest.length){
                this.$alert('请选择发送对象', '提示', {confirmButtonText: '确定',type:'warning'});
                return;
           }
           this.$emit('handleSure',this.dataObj);
       }
   },
   props:{
        show: {
            type: Boolean,
            default:false
        },
    tableData:{
        type:Array,
        default:()=>{
            return []
          }
    },

   },
   watch: {
        show (n,o) {
            this.visible = this.show;
        }
    },
   components: {}
 }
</script>

<style scoped>
.send-msg{
    padding: 10px;
}
 
</style>
