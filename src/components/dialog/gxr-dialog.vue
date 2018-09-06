<template>
 <div>
     <el-dialog
            title="问题评价"
            width="600px"
            :visible.sync="visible"
            :append-to-body="true"
            :close-on-click-modal="false"
            @close="$emit('update:show', false)"
            :show="show">
                <div style="padding:0 10px">
                   <tableLayout>
                     <div slot="top">
                        <p><span class="filter-weight">服务质量：</span><el-rate  v-model="fwzlValue" show-text :texts="['1 分','2 分','3 分','4 分','5 分']"></el-rate></p>
                    </div> 
                    <p>说明：请认定贡献人工时，谢谢您的支持!</p>
                    <div slot="bottom">
                        <span class="filter-weight">合计贡献人: </span><span style="color:#f00">{{tableData.length}}</span> 人
                        <el-table :data="tableData" style="width: 100%" border :max-height="580" border>
                            <el-table-column prop="fbrxm" label="姓名" ></el-table-column>
                            <el-table-column label="工时(小时)">
                                <template slot-scope="scope">
                                    <!-- <el-input v-model="scope.row.qrgs" :readonly="true" size="mini"></el-input> -->
                                    <span>{{scope.row.qrgs}}</span>
                                </template>
                                </el-table-column>
                          </el-table>
                        <div style="text-align:right;margin:10px 0;">
                        <el-button type='primary' size="mini" @click="commitQuestion">提交</el-button>
                        </div>
                    </div> 
                </tableLayout>
            </div>
      </el-dialog>
 </div>
</template>

<script>
 import tableLayout  from '@/components/layout/tableLayout.vue'
 import { queryrReferenceHour,queryQuestion,closeQuestion } from '@/api/xmkb.js'
 export default {
   data () {
     return {
          visible:this.show,
          fwzlValue:0,
          tableData:[],

     }
   },
   methods:{
    queryrReferenceHour(wid){
        queryrReferenceHour({
        wid:wid
      }).then(({ data }) => {
        if (data.state == "success") {
          this.tableData = data.data;
          this.tableData.forEach((ele, i, arr) => {
            ele.qrgs = ele.confirmH.replace("/^.(d+)/", "0.");
          });
        }
      });
    },
    queryQuestion(wid){
        queryQuestion({
            wid:wid
        }).then(({data})=>{
            if(data.state == 'success'){
                this.fwzlValue = !!data.data.zlpf?data.data.zlpf:0
            }
        })
    },
    commitQuestion(){
      //关闭问题（提交）
      let gxrArr = [];
      if (this.tableData.length != 0) {
        this.tableData.forEach((ele, i, arr) => {
          gxrArr.push(ele.fbrxm + "," + ele.fbrbh + "," + ele.qrgs);
        });
      }
      this.$confirm("确定要关闭此问题吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          if (this.fwzlValue == 0) {
            this.$alert("请选择服务质量星级", "提示", {
              confirmButtonText: "确定",
              type: "warning",
              callback: action => {}
            });
            return;
          }
          closeQuestion({
            wid: this.wtInfo.wid,
            zlpf: this.fwzlValue,
            gxrData: gxrArr.join("|"),
            sfjj:"",
            jjsm:''
          }).then(({ data }) => {
            if (data.state == "success") {
              this.innerVisible = false;
              this.$alert(data.msg, "提示", {confirmButtonText: "确定",type: "success",
                callback: action => {
                     this.$emit('closeQuestion','') 
                }
              });
            } else {
              this.$alert(data.msg, "提示", {confirmButtonText: "确定",type: "error"});
            }
          });
        })
        .catch(() => {});
    },
   },
   props:{
       show:{
           type:Boolean,
           default:false
       },
       wtInfo:{
           type:Object,
           default:function(){
               return {}
           }
       }
   },
     watch: {
        show (n,o) {
            this.visible = this.show;
            if(!n){
              
            }else{
               this.queryrReferenceHour(this.wtInfo.wid);
               this.queryQuestion(this.wtInfo.wid);
            }
        }
    },
   components: {tableLayout}
 }
</script>

<style scoped>

 
</style>
