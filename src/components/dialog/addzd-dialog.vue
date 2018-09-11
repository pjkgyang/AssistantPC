<template>
 <div>
     <el-dialog
            :title="title"
            width="700px"
            :visible.sync="visible"
            :append-to-body="true"
            :close-on-click-modal="false"
            @close="$emit('update:show', false)"
            :show="show">
             <el-form ref="form" :model="form" label-width="80px" size="mini" style="padding:10px 20px">
                <el-form-item label="战队名称" required>
                    <el-input v-model="form.qyzd"></el-input>
                </el-form-item>
                <el-form-item label="区域工程" required>
                    <el-select :disabled="title == '编辑战队'" v-model="form.qygc" placeholder="请选择区域工程" style="width:100%">
                        <el-option v-for="(qygc,index) in gczdList" :key="index" :label="qygc.mc" :value="qygc.label"></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="战队队长" required >
                     <el-select v-model="form.qyzddzid" filterable  placeholder="请选择战队队长（可按姓名搜索）" style="width:100%" @change="changeValue">
                        <el-option v-for="(user,index) in userList" :key="index" :label="user.username" :value="user.usercode"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item text-right>
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                    <el-button  @click="handleClose">取消</el-button>
                </el-form-item>
                </el-form>    
      </el-dialog>
 </div>
</template>

<script>
 import { getMenu, getSession } from "@/utils/util.js";
 import { getUsers  } from "@/api/personal.js";
 export default {
   data () {
     return {
          visible:this.show,
          gczdList:[],
          userList:'',
          form: {
            qyzd: '',
            qygc: '',
            qyzddzid:'',
            qyzddzxm:'',
        }
     }
   },
   methods:{
        changeValue(value) {
            let obj = {};
            obj = this.userList.find((item)=>{
                if(item.usercode === value){
                    this.form.qyzddzxm = item.username
                };
            }); 
       },
      onSubmit(){
         if(!this.validate()) return;
          this.saveQyzd();
      },
      handleClose(){
         this.visible = false; 
      },
      validate(){
          if(!this.form.qyzd){
             this.$alert('请填写战队名称', '提示', {confirmButtonText: '确定',type:'warning'});
             return false;
          }
          if(!this.form.qygc){
             this.$alert('请选择区域工程', '提示', {confirmButtonText: '确定',type:'warning'});
             return false;
          }
          if(!this.form.qyzddzid){
             this.$alert('请选择战队队长', '提示', {confirmButtonText: '确定',type:'warning'});
             return false;
          }
          return true;
      },
      saveQyzd(){
          this.$post(this.API.saveQyzd,this.form).then((res)=>{
              if(res.state == 'success'){
                 this.$alert('添加成功', '提示', {confirmButtonText: '确定',type:'success',
                  callback: action => {
                      this.$emit('handleAddSuccess','');
                  }});
                 this.visible = false; 
              }else{
                 this.$alert(res.msg, '提示', {confirmButtonText: '确定',type:'error'});  
              }
          })
      }
   },
   props:{
       show:{
           type:Boolean,
           default:false
       },
       data:{
           type:Object,
           default:()=>{
               return {}
           }
       },
       title:{
           type:String,
           default:'添加战队'
       }
   },
     watch: {
        show (n,o) {
            this.visible = this.show;
            if(!n){
              
            }else{
                this.form = this.data
                if (getSession("UnResponsiveStatus") == null) {
                    getMenu("gczd", this.gczdList, true); //获取工程战队
                } else {
                    this.gczdList = getSession("gczd");
                }
                getUsers({
                    curPage:1,
                    pageSize:9999,
                    unitType:0,
                    keyword:'',
                    dept:'01AM'
                }).then(({ data }) => {
                    if (data.state == "success") {
                        this.userList = data.data.rows
                    }
                });
            }
        }
    },
   components: {}
 }
</script>

<style scoped>

 
</style>
