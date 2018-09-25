<template>
 <div>
      <el-dialog
            :title="title"
            width="700px"
            top="30px"
            :visible.sync="visible"
            :append-to-body="true"
            :close-on-click-modal="false"
            @close="$emit('update:show', false)"
            :show="show">
            <div class="dialog-qrbhfw">
                   <div flex v-if=" title == '确认服务'">
                       <span class="filter-weight before-require">评价</span>&#x3000;
                       <el-rate v-model="value"  :show-text="true"  :texts="['1分', '2分', '3分', '4分', '5分']"></el-rate>
                   </div>
                    <div flex class="mg-12">
                       <span class="filter-weight before-require">说明</span>&#x3000;
                       <el-input type="textarea"  :rows="5" placeholder="请输入说明内容" v-model="sm" style="width:580px"></el-input>
                   </div><br>
                   <div text-right>
                       <el-button size="mini" type="primary" @click="handleCommit">保存</el-button>&#x3000;
                       <el-button size="mini"  @click="handleClose">取消</el-button>
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
         value:null,
         sm:''
     }
   },
   methods:{
       handleClose(){  
           this.visible = false
       },
       handleCommit(){
             
       },
   },
   props:{
        show: {
            type: Boolean,
            default:false
        },
        title:{
            type:String,
            default:'确认服务'
        }
   },
   watch: {
        show (n,o) {
            this.visible = this.show;
            if(!n){
              
            }else{

            }
        }
    },
   components: {}
 }
</script>

<style scoped>
.dialog-qrbhfw{
    padding:15px 30px;
}
 
</style>
