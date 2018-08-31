<template>
 <div>
      <el-dialog
            :title="title"
            width="96%"
            min-width="700px"
            top="30px"
            :visible.sync="visible"
            :close-on-click-modal="false"
            class="Report-detailDialog"
            @close="$emit('update:show', false)"
            :show="show">
            <div class="dialog">
               <slot name="content"></slot>
               <section class="btn-group">
                    <el-button size="small" @click="handleClose">关闭</el-button>
                </section>
            </div>
        </el-dialog>
 </div>
</template>

<script>
 export default {
   data () {
     return {
         visible:this.show,
 
     }
   },
   methods:{
       handleClose(){
           this.visible = false
       }
   },
   props:{
        show: {
            type: Boolean,
            default:false
        },
        title:{
            type:String,
            default:''
        }
   },
   watch: {
        show (n,o) {
            this.visible = this.show;
            if(!n){
            }
        }
    },
   components: {}
 }
</script>

<style scoped>
.btn-group{
    padding: 10px 28px ;
    float: right;
}
 
</style>
