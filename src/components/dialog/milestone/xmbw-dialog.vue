
<template>
  <div class="xmbw-dialog">
    <el-dialog title="项目备忘" width="800px" :visible.sync="visible" :append-to-body="true" :close-on-click-modal="false" @close="$emit('update:show', false)" :show="show">
      <el-form ref="form" :model="form" label-width="140px" size="mini" style="padding:20px;" label-position="top" 
      :inline="true">
          <el-form-item label="承诺完成时间" required>
              <el-date-picker style="width:750px" v-model="form.cnwcrq" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <div>
            <div class="cpList-option" v-for="(item,index) in cpDataList" flex>
              <div flex colcenter > 
                <el-form-item label="产品" required >
                    <el-select v-model="item.cpbh"  placeholder="请选择" @change="handleChange">
                    <el-option
                      v-for="(cp,index) in cpList"
                      :key="index"
                      :label="cp.cpmc"
                      :value="cp.cpdm">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="实施工作量(人/月)" required>
                <el-input  placeholder="请输入实施工作量" v-model="item.ssgzl"></el-input>
                </el-form-item>
                <el-form-item label="二开工作量(人/月)" required>
                <el-input   placeholder="请输入二开工作量" v-model="item.ekgzl"></el-input>
                </el-form-item>
                <el-form-item label="可变费用(元)">
                <el-input   placeholder="请输入可变费用" v-model="item.kbgzl"></el-input>
                </el-form-item>
              </div>
              <div class="cpList-delete"  v-if="index !== 0">
                  <span  @click="handleDelete(index)" title="删除"  class="el-icon-error"></span>
              </div>
            </div>
            <div>
              <a href="jvaScript:;;" @click="handleAddcp"><span class="el-icon-circle-plus"></span>新增选择产品</a>
            </div>
          </div>
          <el-form-item label="说明" required>
           <el-input style="width:750px" type="textarea" :rows="3" placeholder="请输入说明内容" v-model="form.sm"></el-input>
          </el-form-item>
        </el-form>  
      <div text-right class="pd-10">
        <el-button type="primary" size="mini" @click="handleCommitMilestone">提交</el-button>
        <el-button size="mini" type="" @click="handleCloseDialog">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { queryMilestoneOperationrecords } from "@/api/milestone.js";
import { getMenu, getSession } from "@/utils/util.js";

import axios from "axios";
import Qs from "qs";
export default {
  data() {
    return {
      visible: this.show,
      form: {
        cnwcrq: "",
        sm: "",
        cps:""
      },
      cpDataList:[{
        cp:'',
        cpbh:'',
        cpmc:'',
        ssgzl:0,
        ekgzl:0,
        kbgzl:0
      }],

      cpList:[],
      isValid:true,
      count:0
    };
  },
  methods: {
    handleChange(val){
      this.count = 0;
      let cpObj = this.cpList.find(ele=>{
          return val == ele.cpdm
      })
      this.cpDataList.forEach((ele,i,arr)=>{
        if(val == ele.cpbh){
          this.count += 1
          ele.cpmc = cpObj.cpmc;
          if(this.count != 1){
            this.$alert("该产品已选择,请确定~", "提示", {confirmButtonText: "确定",type: "warning"});
          }
        }
      })
    },
    handleCloseDialog() {
      this.visible = false;
    },
    handleCommitMilestone() {
      if(!this.validate()) return;
      this.$emit("handleCommitXmbw", this.form,this.isValid);
    },
    // 添加列
    handleAddcp(){
      this.cpDataList.push({
        cp:'',
        cpbh:'',
        cpmc:'',
        ssgzl:0,
        ekgzl:0,
        kbgzl:0
      })
    },
    // 删除
    handleDelete(index){
      this.cpDataList.splice(index,1);
    },
    validate(){
      this.form.cps = '';
      this.cpDataList.forEach(ele=>{
        // ele.cpmc = ele.cp.split('&')[1];
        // ele.cpbh = ele.cp.split('&')[0];
        if(!ele.cpmc || !ele.cpbh){
          this.$alert("请选择产品", "提示", {
            confirmButtonText: "确定",
            type: "warning"
          });
         this.isValid = false;
         return;
        }
        // /^[0-9]+\d*$/
        if(!/^\d+(\.\d+)?$/.test(ele.ssgzl)){
          this.$alert("请输入正确实施工作量", "提示", {
            confirmButtonText: "确定",
            type: "warning"
          });
         this.isValid = false;
         return;
        }
        if(!/^\d+(\.\d+)?$/.test(ele.ekgzl)){
          this.$alert("请输入正确二开工作量", "提示", {
            confirmButtonText: "确定",
            type: "warning"
          });
          this.isValid = false;
          return;
        }
        if(ele.kbgzl == ''){
           ele.kbgzl = 0;
          }else if (!/^\d+(\.\d+)?$/.test(ele.kbgzl)) {
          this.$alert("请输入正确可变工作量", "提示", {
            confirmButtonText: "确定",
            type: "warning"
          });
          this.isValid = false;
          return;
        }
        this.isValid = true;
        this.form.cps += ele.cpbh + String.fromCharCode(1) + ele.cpmc + String.fromCharCode(1) + ele.ssgzl + String.fromCharCode(1)
        + ele.ekgzl + String.fromCharCode(1) + ele.kbgzl + String.fromCharCode(2)
      })

      if (!this.form.cnwcrq) {
        this.$alert("请选择承诺完成日期", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return false;
      }
      if (!this.form.sm) {
        this.$alert("请填写备忘说明", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return false;
      }
      return true;
    },

    // 获取合同产品
    listHtnrApp(){
      this.$get(this.API.listHtnrApp,{
       xmbh:this.xmbh
      }).then(res=>{
        if(res.state == 'success'){
          this.cpList = res.data
        }else{
          this.$alert(res.msg, "提示", {confirmButtonText: "确定",type: "warning"});
        }
      })
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    xmbh:{
      type:String,
      default:""
    },
    lcbData:{
      type:Object,
      default:()=>{
        return {}
      }
    },
    isEdit:{
      type:Boolean,
      default:false
    }
  },
  watch: {
    show(n, o) {
      this.visible = this.show;
      if (!n) {
        this.form.cnwcrq = this.form.sm = "";
        this.form.ssgzl =  this.form.ekgzl = this.form.kbgzl =  0;
        this.cpDataList = [{
                  cp:'',
                  cpbh:'',
                  cpmc:'',
                  ssgzl:0,
                  ekgzl:0,
                  kbgzl:0
                }]
      } else {
        if(this.isEdit){
          this.form.cnwcrq = this.lcbData.lcb.cnjssj
          if(!!this.lcbData.cps){
            this.cpDataList = this.lcbData.cps
          }
        }
        this.listHtnrApp();
      }
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.cpList-option{
  border-bottom:1px dashed #999;
}
.cpList-delete{
  line-height: 80px;
  span{
    color: #f00;
    &:hover{
      cursor: pointer;
    }
  }
}
</style>
