<template>
  <div>
    <el-dialog title="服务事项基本信息" :visible.sync="dialogVisible" :append-to-body="true" :close-on-click-modal="false"
      @close="$emit('update:show', false)" :show="show" width="1000px">
      <el-form ref="form" :model="form" label-width="135px" size="mini" style="padding: 10px;">
        <div flex>
          <el-form-item label="服务名称" required>
            <el-input v-model="form.fwmc" placeholder="请输入服务名称" style="width:355px"></el-input>
          </el-form-item>
          <el-form-item label="服务对象" required>
            <el-select v-model="form.fwdx" multiple placeholder="请选择服务对象" style="width:355px">
              <el-option v-for="(fwdx,index) in fwdxList" :key="index" :label="fwdx.text" :value="fwdx.id"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div flex>
          <el-form-item label="联系人" required>
            <el-input v-model="form.lxr" type="text" placeholder="请输入联系人" style="width:355px"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" required>
            <el-input v-model="form.lxfs" type="number" placeholder="请输入联系方式" style="width:355px"></el-input>
          </el-form-item>
        </div>

        <div flex>
          <el-form-item label="服务类别" required>
            <el-select v-model="form.fwlb" placeholder="请选择服务类别" style="width:355px">
              <el-option v-for="(fwlb,index) in fwlbList" :key="index" :label="fwlb.text" :value="fwlb.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="涉及部门" required>
            <el-input v-model="form.sjbm" placeholder="请输入涉及部门" style="width:355px"></el-input>
          </el-form-item>
        </div>

        <el-form-item label="服务内容" required>
          <el-input type="textarea" placeholder="请输入服务内容" v-model="form.fwnr"></el-input>
        </el-form-item>
        <el-form-item label="办事依据" required>
          <el-input v-model="form.bsyj" placeholder="请输入办事依据" style="width:100%"></el-input>
        </el-form-item>
        <el-form-item label="办事依据附件">
          <uploadFile :istb="isClearFileBsyj" @handleUploadFile="handleUploadFileBsyj"></uploadFile>
          <p class="file" v-if="!!bsyjfjMc">{{bsyjfjMc}} <i class="el-icon-close" @click="handleRemoveBsyjfj"></i></p>
        </el-form-item>


        <el-form-item label="服务指南" required>
          <el-radio-group v-model="form.fwzn" style="width:100%" >
            <el-radio label="1">有</el-radio>
            <el-radio label="0">无</el-radio>
          </el-radio-group>
        </el-form-item>

          <el-form-item label="服务指南说明" required  v-if="form.fwzn == 1">
            <el-input type="textarea" placeholder="服务指南说明" v-model="form.fwznsm"></el-input>
          </el-form-item>
          <el-form-item label="服务指南附件"  v-if="form.fwzn == 1">
            <uploadFile :istb="isClearFileFwzn" @handleUploadFile="handleUploadFileFwzn"></uploadFile>
             <p class="file" v-if="!!fwznfjMc">{{fwznfjMc}} <i class="el-icon-close" @click="handleRemoveFwznfj"></i></p>
          </el-form-item>

        <el-form-item label="信息化支持" required>
          <el-radio-group v-model="form.xxhzc" style="width:100%">
            <el-radio label="1">有</el-radio>
            <el-radio label="0">无</el-radio>
          </el-radio-group>
        </el-form-item>


      <!-- 信息化支持 有显示 -->
      <div v-if="form.xxhzc == 1">
        <div flex>
            <el-form-item label="建设年份" required>
              <el-date-picker v-model="form.jsnf" align="right" type="year" placeholder="选择年" style="width:355px">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="承建公司" required>
              <el-input v-model="form.cjgs" placeholder="请输入承建公司" style="width:355px"></el-input>
            </el-form-item>
          </div>

          <div flex>
            <el-form-item label="建设状态" required>
              <el-select v-model="form.jszt" placeholder="请选择建设状态" style="width:355px">
                <el-option label="在建" value="1"></el-option>
                <el-option label="售后" value="2"></el-option>
                <el-option label="服务" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="上线时间" required>
              <el-date-picker type="date" placeholder="选择日期" v-model="form.sxsj" style="width: 355px;"></el-date-picker>
            </el-form-item>
          </div>

          <div flex>
            <el-form-item label="信息中心对接老师" >
              <el-input v-model="form.xxzxdjls" placeholder="请输入信息中心对接老师" style="width:355px"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" >
              <el-input v-model="form.xxzxdjlslxfs" type="number" placeholder="请输入联系方式" style="width:355px"></el-input>
            </el-form-item>
          </div>
          <div flex>
            <el-form-item label="业务部门对接老师" >
              <el-input v-model="form.ywbmdjls" placeholder="请输入业务部门对接老师" style="width:355px"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" >
              <el-input v-model="form.ywbmdjlslxfs" type="number" placeholder="请输入联系方式" style="width:355px"></el-input>
            </el-form-item>
          </div>
          <div flex>
            <el-form-item label="承建公司对接人" >
              <el-input v-model="form.cjgsdjr" placeholder="请输入业务部门对接老师" style="width:355px"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" >
              <el-input v-model="form.cjgsdjrlxfs" type="number" placeholder="请输入联系方式" style="width:355px"></el-input>
            </el-form-item>
          </div>
        </div>


        <el-form-item label="使用情况">
          <el-input type="textarea" rows="4" placeholder="请输入使用情况" v-model="form.syqk" style="width:100%"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" rows="4" placeholder="请输入备注" v-model="form.bz"></el-input>
        </el-form-item>
        <el-form-item text-right>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import uploadFile from '@/components/BusinessPage/upload'
  export default {
    data() {
      return {
        dialogVisible: this.show,
        isClearFileBsyj: false, //办事依据 附件
        isClearFileFwzn: false, //服务指南 附件
        // 服务类别
        fwlbList: [],
        // 服务对象
        fwdxList: [],
        fwData:{},
        bsyjfjMc:'',//办事依据附件名称
        fwznfjMc:'',//服务指南附件名称
        form: {
          fwmc: '',
          fwdx: [],
          lxr: '', //联系人
          lxfs: '', //联系方式
          sjbm: '', //设计部门
          bsyj: '',
          bsyjfj :'',//办事依据附件
          fwzn: '0',
          fwznsm: '',
          fwznfj :'',//服务指南附件
          fwlb: '',
          fwnr: '',
          xxhzc: '0', //信息化支持
          jsnf: '', //建设年份
          cjgs: '', //承建公司
          jszt: '', //建设状态
          sxsj: '', //上线时间
          xxzxdjls: '', //信息中心对接人
          xxzxdjlslxfs: '', //信息中心对接人  联系方式
          ywbmdjls: '', //业务部门对接人
          ywbmdjlslxfs: '', //业务部门对接人 联系方式
          cjgsdjr: '', //承建公司对接人
          cjgsdjrlxfs: '', //承建公司对接人 联系方式
          syqk: '', //使用情况
          bz: ''
        },
       }
      },
      props: {
          show: {
            type: Boolean,
            default: false
          },
          Type: {
            type: String,
            default: ''
          },
          wid:{
            type:String,
            default:''
          }
        },
        watch: {
          show(n, o) {
            if (!!n) {
              this.getService();
              if (this.Type == 'edit') {
                    this.$get(this.API.getServiceItem,{
                    	wid:this.wid
                    }).then(res=>{
                    	if(res.state == 'success'){
                    		this.fwData = res.data;
                        this.form.fwmc = this.fwData.fwmc;
                        this.form.fwdx = this.fwData.fwdxwid.split(',');
                        this.form.lxr = this.fwData.lxr; //联系人
                        this.form.lxfs = this.fwData.lxfs; //联系方式
                        this.form.sjbm = this.fwData.sjbm; //涉及部门
                        this.form.bsyj = this.fwData.bsyj;
                        this.bsyjfjMc = !this.fwData.bsyjFj?'':this.fwData.bsyjFj[0].fjmc;
                        this.form.bsyjfj = !this.fwData.bsyjFj?'':this.fwData.bsyjFj[0].fjbh+'|'+this.fwData.bsyjFj[0].fjmc;//办事依据附件
                        this.form.fwzn = this.fwData.fwzn;
                        this.form.fwznsm = this.fwData.fwznsm;
                        this.fwznfjMc = !this.fwData.fwznFj?'':this.fwData.fwznFj[0].fjmc; //服务指南附件
                        this.form.fwznfj = !this.fwData.fwznFj?'':this.fwData.fwznFj[0].fjbh+'|'+this.fwData.fwznFj[0].fjmc;//服务指南附件
                        this.form.fwlb = this.fwData.fwlbwid;
                        this.form.fwnr = this.fwData.fwnr;
                        this.form.xxhzc = this.fwData.xxhzc; //信息化支持
                        this.form.jsnf = this.fwData.jsnf; //建设年份
                        this.form.cjgs = this.fwData.cjgs; //承建公司
                        this.form.jszt = this.fwData.jszt;//建设状态
                        this.form.sxsj = this.fwData.sxsj; //上线时间
                        this.form.xxzxdjls = this.fwData.xxzxdjls; //信息中心对接人
                        this.form.xxzxdjlslxfs = this.fwData.xxzxdjlslxfs;//信息中心对接人  联系方式
                        this.form.ywbmdjls = this.fwData.ywbmdjls;//业务部门对接人
                        this.form.ywbmdjlslxfs = this.fwData.ywbmdjlslxfs;//业务部门对接人 联系方式
                        this.form.cjgsdjr = this.fwData.cjgsdjr; //承建公司对接人
                        this.form.cjgsdjrlxfs = this.fwData.cjgsdjrlxfs; //承建公司对接人 联系方式
                        this.form.syqk = this.fwData.syqk; //使用情况
                        this.form.bz = this.fwData.bz;
                        this.form.wid = this.fwData.wid; //wid
                    	}else{}
                    })
              } else {
                delete this.form.wid;
                this.form.fwmc =  this.form.lxr =  this.form.lxfs = this.form.sjbm = '';
                this.form.bsyj = '';
                this.form.bsyjfj = '';
                this.form.fwzn = '0';
                this.form.fwznsm = '';
                this.form.fwznfj = '';
                this.form.fwlb = '';
                this.form.fwnr = '';

                this.form.xxhzc = '0';
                this.form.jsnf = '';
                this.form.cjgs = '';
                this.form.jszt = '';
                this.form.sxsj = '';

                this.form.xxzxdjls = '';
                this.form.xxzxdjlslxfs = '';
                this.form.ywbmdjls = '';
                this.form.ywbmdjlslxfs = '';
                this.form.cjgsdjr = '';
                this.form.cjgsdjrlxfs = '';
                this.form.syqk = '';
                this.form.bz = '';

                this.form.fwdx =[];//服务对象
              }
            } else {

            }
            this.dialogVisible = this.show;
          }
        },
        methods: {

          // 办事依据 file
          handleUploadFileBsyj(data) {
            this.form.bsyjfj = data.join(',');
          },
          // 服务指南
          handleUploadFileFwzn(data) {
            this.form.fwznfj = data.join(',');
          },
          // 删除办事依据附件
          handleRemoveBsyjfj(){
             this.form.bsyjfj = '';
             this.bsyjfjMc = '';
          },
          // 服务指南附件
          handleRemoveFwznfj(){
             this.form.fwznfj = '';
             this.fwznfjMc = '';
          },
          // 获取服务对象下拉列表
          getService() {
            this.$get(this.API.serviceObjects, {}).then(res => {
              if (res.state == 'success') {
                this.fwdxList = res.data;
              } else {
                this.$message({
                  message: res.msg,
                  type: 'error'
                });
              }
            })
            // 获取服务类别下拉列表
            this.$get(this.API.serviceCatalogs, {}).then(res => {
              if (res.state == 'success') {
                this.fwlbList = res.data;
              } else {
                this.$message({
                  message: res.msg,
                  type: 'error'
                });
              }
            })
          },
          onSubmit() {
            if (!this.valiDate()) return;
            this.$emit('handleCommitService', this.form);
          },

           getServiceItem(){
              this.$get(this.API.getServiceItem,{
              	wid:this.wid
              }).then(res=>{
              	if(res.state == 'success'){
              		this.fwData = res.data;
              	}else{

              	}
              })
          },


          valiDate() {
            if (!this.form.fwmc) {
              this.$message({message: '请填写服务名称',type: 'warning'})
              return false;
            }
            if (!this.form.fwdx.length) {
              this.$message({message: '请选择服务对象',type: 'warning'})
              return false;
            }
            if (!this.form.lxr) {
              this.$message({message: '请输入联系人',type: 'warning'})
              return false;
            }
            if (!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(this.form.lxfs) || !(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.form
                .lxfs))) {
              this.$message({message: '请填写正确联系方式', type: 'warning'})
              return false;
            }

            if (!this.form.fwlb) {
              this.$message({message: '请选择服务类别',type: 'warning'})
              return false;
            }
             if (!/\S/.test(this.form.sjbm)) {
              this.$message({message: '请填写涉及部门',type: 'warning'})
              return false;
            }
            if (!/\S/.test(this.form.fwnr)) {
              this.$message({message: '请填写服务内容',type: 'warning'})
              return false;
            }
            if (!/\S/.test(this.form.bsyj)) {
              this.$message({message: '请填写办事依据',type: 'warning'})
              return false;
            }

            // if (!!this.form.fwzn && !this.form.fwznsm) {
            //   this.$message({message: '请填写服务指南说明',type: 'warning'})
            //   return false;
            // }

            // 有信息化支持
            if (this.form.xxhzc==1 && !this.form.jsnf) {
              this.$message({message: '请选择建设年份',type: 'warning'})
              return false;
            }
            if (this.form.xxhzc==1 && !this.form.cjgs) {
              this.$message({message: '请输入承建公司',type: 'warning'})
              return false;
            }
            if (this.form.xxhzc==1 && !this.form.jszt) {
              this.$message({message: '请选择建设状态',type: 'warning'})
              return false;
            }
            if (this.form.xxhzc==1 && !this.form.sxsj) {
              this.$message({message: '请选择上线时间',type: 'warning'})
              return false;
            }
            return true;
          },
        },
        components: {
          uploadFile
        },
    };
</script>

<style lang="scss" scoped>
  .title {
    font-weight: 700;
    padding: 0 10px;
    margin: 10px 0;
    border-left: 4px solid blueviolet;
  }
  .file{
    padding: 2px 6px;
    border-radius: 3px;
    margin-top: 4px !important;
     &:hover {
     	background: rgba(216, 214, 214, 0.5);
     }
    i{
      width: 20px;
      height: 20px;
      border-radius: 50%;
      text-align: center;
      line-height: 20px;
      &:hover{
        color: #f00;
        cursor: pointer;
        background:  rgba(255, 0, 0, 0.25);
      }
    }
  }
</style>
