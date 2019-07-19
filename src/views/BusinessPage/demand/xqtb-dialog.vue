<template>
  <div>
    <el-dialog title="需求提报" width="700px" top="30px" :visible.sync="visible" :append-to-body="true"
      :close-on-click-modal="false" @close="$emit('update:show', false)" :show="show">
      <div class="dialog-pj">
        <section>
          <p>
            <span class="filter-weight">提报老师：</span>
            <el-select v-model="teacherData" size="mini" multiple filterable placeholder="请选择提出老师(可按姓名搜索)" style="width:605px"
              @change="handleChangeTcls">
              <el-option v-for="(tcls, index) in tclsList" :key="index" :label="tcls.username" :value="tcls.userid+','+tcls.username"></el-option>
            </el-select>
          </p>
          <p class="mg-12">
            <span class="filter-weight">是否会签：</span>
            <el-radio-group v-model="filterData.sfhq">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </p>
          <p flex>
             <span class="filter-weight">上传附件：</span>
             <uploadFile :Type="'demand'" :istb="isClearFile" @handleUploadFile="handleUploadFile"></uploadFile>
          </p>
          <p class="pj-content">
            <span class="filter-weight">备注：</span>
            <el-input type="textarea" :rows="5" :maxlength="500" style="width:680px" placeholder="请输入备注内容" v-model="filterData.sm"></el-input>
          </p>
        </section>
        <section class="pj-btn-group">
          <el-button size="small" type="primary" @click="handleClickSure">确定</el-button>
          <el-button size="small" @click="visible = false">取消</el-button>
        </section>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import uploadFile from '@/components/BusinessPage/upload';
  export default {
    data() {
      return {
        visible: this.show,
        isClearFile:false,
        tclsList:[],
        teacherData:[],
        filterData: {
          sm: '',
          qrls: '',
          sfhq: 1,
          fjid:'',
          teacherData:[]
        }
      }
    },
    methods: {
      // 选择提出老师
      handleChangeTcls(val) {
        this.filterData.teacherData = val.join('|');
      },
      handleClickSure() {
        if (!this.validate()) return;
        this.$emit('handleClickSure', this.filterData);
      },
      // 上传附件
      handleUploadFile(data){

      },
      validate() {
        if (/^[\s]*$/.test(this.sm)) {
          this.$alert('请填写说明内容', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          });
          return false;
        }
        return true;
      },

      getUsers() {
        this.$get(this.API.getUsers, {
          curPage:1,
          pageSize:999,
          xmbh: this.xmbh,
          unitType:1
        }).then(res => {
          if (res.state == 'success') {
            this.tclsList = res.data.rows;
          } else {}
        })
      },
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      xmbh: {
        type: String,
        default: ''
      }
    },
    watch: {
      show(n, o) {
        this.visible = this.show;
        if (!!n) {
            this.getUsers();
        } else {

        }
      }
    },
    components: {uploadFile}
  }
</script>

<style scoped>
  .dialog-pj {
    padding: 8px 10px;
  }

  .dialog-pj section:nth-of-type(2) {
    margin: 10px 0;
  }

  .pj-title {
    font-weight: 700;
    width: 14%;
  }

  .pj-content {
    width: 86%;
  }

  .pj-btn-group {
    text-align: right;
    padding: 10px 0;
  }
</style>
