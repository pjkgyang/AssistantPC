<template>
  <div>
    <el-dialog title="提报crowd任务" width="1000px" top="30px" :visible.sync="visible" :append-to-body="true"
      :close-on-click-modal="false" @close="$emit('update:show', false)" :show="show">
      <div class="pd-10">
        <el-form :model="crowdxqData" :rules="rules" ref="crowdxqData" class="demo-ruleForm">
          <el-form-item>
            <div class="send-crowd_topic">分配开发工程师</div>
          </el-form-item>

          <el-form-item label=""  v-if="Type == 'kfgcs'">
            <el-select size="mini" v-model="kfgcsData" multiple filterable remote reserve-keyword placeholder="请选择开发工程师(可搜索)"
              :remote-method="remoteMethod" :loading="loading" style="width:100%;">
              <el-option v-for="item in kfgcsList" :key="item.uid" :label="item.nickName" :value="item.uid">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="" v-if="Type == 'kfgcs'">
            <div id="summernoteT"></div>
          </el-form-item>

          <el-form-item label="">
            <div class="send-crowd_topic">发布需求流程</div>
          </el-form-item>

          <el-form-item label="" prop="rwfl">
            <el-select size="mini" v-model="crowdxqData.rwfl" placeholder="请选择需求分类" style="width: 100%;">
              <el-option v-for="item in CrowdDemandList" :key="item.label" :label="item.mc" :value="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <div class="send-crowd_topic">请完善需求的基本信息</div>
          </el-form-item>
          <el-form-item prop="rwmc">
            <el-input size="mini" v-model="crowdxqData.rwmc" placeholder="一个清晰的名字能帮助开发者快速的了解需求"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select size="mini" v-model="crowdxqData.rwlx" placeholder="请选择需求类型" style="width: 100%;">
              <el-option label="--- 请选择需求类型 ---" value=""></el-option>
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select size="mini" v-model="crowdxqData.sfjj" placeholder="请选择需求紧急类型" style="width: 100%;">
              <el-option label="紧急" value="1"></el-option>
              <el-option label="不紧急" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select size="mini" v-model="crowdxqData.sfxyzc" placeholder="请选择是否需要驻场" style="width: 100%;">
              <el-option label="需要驻场" value="1"></el-option>
              <el-option label="不需要驻场" value="0"></el-option>
            </el-select>
          </el-form-item>
          <!-- 预算金额 -->
          <el-form-item>
            <el-input size="mini" v-model="crowdxqData.xmysje" :readonly="crowdxqData.rwlx == '2'" placeholder="请输入预算金额(元)"></el-input>
          </el-form-item>
          <!-- 机密信息 -->
          <el-form-item>
            <el-input type="textarea" placeholder="请输入机密信息 , 可填写项目的账号、密码等信息,只对中标用户显示" v-model="crowdxqData.jmxx"></el-input>
          </el-form-item>
          <!-- 需求描述 -->
          <el-form-item prop="xqms">
            <el-input type="textarea" placeholder="请输入需求描述" v-model="crowdxqData.xqms"></el-input>
          </el-form-item>

          <el-form-item>
            <uploadFile :isCrowd="true" @handleUploadFile="handleUploadFile"></uploadFile>
          </el-form-item>

          <el-form-item>
            <div class="send-crowd_topic">请选择需求客户/学校/个人的期望交付日期，该日期仅作数据记录使用</div>
          </el-form-item>
          <el-form-item>
            <el-date-picker :picker-options="pickerJfrqDateBefore" value-format="yyyy-MM-dd" size="mini" type="date"
              placeholder="请输入学校或个人期望交付日期，仅作数据记录使用 " v-model="crowdxqData.qwjfrq" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <div class="send-crowd_topic" flex spacebetween>
              <span>请选择需求的招标/交付日期</span>
              <a href="javaScript:;;" @click="handleCheckDateRule">日期规则</a>
            </div>
          </el-form-item>
          <el-form-item>
            <el-date-picker @change="handleChoosejfDate" value-format="yyyy-MM-dd" :picker-options="pickerJfrqDateBefore"
              size="mini" type="date" placeholder="请输入需求招标截至日期，到达该日期后，如果没有投标或者选标，需求则会自动关闭" v-model="crowdxqData.zbjzrq"
              style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-date-picker @change="handleChoosejfDate2" value-format="yyyy-MM-dd" :picker-options="pickerJfrqDateBefore"
              size="mini" type="date" placeholder="请输入预期交付日期日期，中标者将严格按照该日期交付需求相关信息" v-model="crowdxqData.jfrq" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <div class="send-crowd_topic">请选择需求的相关项目信息</div>
          </el-form-item>
          <el-form-item>
            <el-select size="mini" v-model="crowdxqData.cpxbh" filterable @change="handleSeleteYwx" placeholder="请选择业务线信息(可搜索)"
              style="width: 100%;">
              <el-option v-for="(item, index) in CrowdYwx" :key="index" :label="item.lbmc" :value="item.lbdm"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select size="mini" filterable v-model="crowdxqData.cpbh" placeholder="请选择产品信息(可搜索)" style="width: 100%;">
              <el-option v-for="(item, index) in CrowdCp" :key="index" :label="item.lbmc" :value="item.lbdm"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item text-right>
            <el-button size="mini" type="primary" @click="sendSubmitForm('crowdxqData')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <el-dialog title="日期规则" :visible.sync="dateruleVisible" :close-on-click-modal="false" width="600px" top="30px"
      append-to-body>
      <div style="padding:20px 10px" class="crowd-rqgz">
        <h4>第一条 名词解释</h4>
        <p>1、招标截止日期：表示需求在该日期之前，允许开发者投标，过期自动关闭需求。</p>
        <p>2、交付日期：要求开发者在这之前（包括本日）提交需求验收。</p>
        <br />
        <h4>第二条 招标截止日期要求</h4>
        <p>
          1、针对需求类型，预算费用在1200元以内的需求默认预留2个工作日的审核时间，1200元及以上需求的审核时间不超过5个工作日,预算费用在1200元以内的需求默认预留2个工作日的投标周期，1200元及以上需求的审核时间不超过3个工作日的投标周期。
        </p>
        <p>2、针对BUG类型，BUG类任务审核周期为1个工作日，审核后BUG责任人应在24小时内解决，遇到复杂问题或工作量大无法在24小时内解决时，责任人需要给出计划解决时间。</p>
        <br />
        <h4>第三条 交付日期约定</h4>
        <p>
          从需求中标日期起，大于需求标准开发人天，小于两倍标准开发人天的日期区间为需求的合理交付日期区间。需求审核人员有权根据开发资源状况在合理交付日期区间内调整交付日期，对于不在合理交付日期区间内的交付时间要求，由需求方与需求审核人进行协商并达成一致，无法达成一致时，需求方可向平台进行申诉。。
        </p>
        <br />
        <h4>第四条 约定解释权</h4>
        <p>1、该解释权归属平台所有，自发布日期开始，立即生效，无需和发包方确认。</p>
        <p>2、若任务确认紧急，请在发布任务的时候，选择紧急任务，平台审核方会和发包方确认，并收取合理的加急费用。</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import uploadFile from '@/components/BusinessPage/upload.vue';
  import {
    getMenu,
    getSession
  } from '@/utils/util.js';
  import { queryUser } from "@/api/personal.js";

  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (!/^([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])$/.test(value) && crowdxqData.rwlx != '2') {
          callback(new Error('请填写正确金额'));
        } else {
          callback();
        }
      };
      return {
        dateruleVisible: false, //日期规则
        visible: this.show,
        pickerJfrqDateBefore: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        loading:false,//开发工程师查询loading
        kfgcsData: [], //开发工程师
        CrowdDemandList: [], //需求分类
        CrowdYwx: [], //业务线
        CrowdCp: [], //产品
        kfgcsList:[],//开发工程师列表
        options: [{
            value: '1',
            label: '需求'
          },
          {
            value: '2',
            label: 'BUG'
          }
        ],

        rules: {
          rwmc: [{
            required: true,
            message: '请输入基本信息',
            trigger: 'blur'
          }],
          rwfl: [{
            required: true,
            message: '请选择需求分类',
            trigger: 'change'
          }],
          xmysje: [{
            validator: validatePass,
            trigger: 'blur'
          }],
          zbjzrq: [{
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }],
          jfrq: [{
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }],
          qwjfrq: [{
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }],
          xqms: [{
            required: true,
            message: '请填写需求描述',
            trigger: 'blur'
          }]
        },
        crowdxqData: {
          rwfl: '', //需求分类
          rwmc: '', //需求基本信息
          rwlx: '', //需求类型
          sfjj: '0', //需求紧急
          sfxyzc: '0', //是否需要驻场
          xmysje: 0,
          jmxx: '',
          xqms: '', //需求描述
          zbjzrq: '',
          jfrq: '',
          qwjfrq: '',
          cpxbh: '', //业务线信息
          cpbh: '',
          xmbh: '',
          fjid: ''
        },
      }
    },
    methods: {
      handleClose() {
        this.visible = false
      },
      // 上传附件
      handleUploadFile(data) {
        this.crowdxqData.fjid = data.join(',');
      },
      // 选择业务线
      handleSeleteYwx(val) {
        this.getCrowdCp(val);
      },
      // 截止日期（1）
      handleChoosejfDate(val) {
        if (val > this.crowdxqData.jfrq) {
          this.$alert('招标截止日期不能大于交付日期，请重新选择', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          });
          this.crowdxqData.zbjzrq = '';
        }
      },
      // 交付日期
      handleChoosejfDate2(val) {
        if (val < this.crowdxqData.zbjzrq) {
          this.$alert('招标截止日期不能大于交付日期，请重新选择', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          });
          this.crowdxqData.jfrq = '';
        }
      },
      // 查看日期规则
      handleCheckDateRule() {
        this.dateruleVisible = true;
      },
      // 提交需求
      sendSubmitForm(formName) {
        if (!this.crowdxqData.jfrq || !this.crowdxqData.zbjzrq) {
          this.$alert('请填写招标日期/交付日期', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          });
          return;
        }
        if (this.crowdxqData.rwlx != '2' && !/^([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])$/.test(this.crowdxqData.xmysje)) {
          this.$alert('请填写正确金额', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          });
          return;
        }
        this.crowdxqData.xmbh = this.qusetionInfo.xmbh; // 项目编号
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$post(this.API.crowdFbrw, this.crowdxqData).then(res => {
              if (res.state == 'success') {
                this.addOrUpdateCrowdId('', res.data, '');
                this.crowdVisible = false;
                this.crowdxqData.fjid = '';
              } else {
                this.$alert(res.msg, '提示', {
                  confirmButtonText: '确定',
                  type: 'warning'
                });
              }
            });
          } else {
            return false;
          }
        });
      },

      // 获取业务线
      getCrowdYwx() {
        this.$get(this.API.getCrowdYwx, {}).then(res => {
          if (res.state == 'success') {
            this.CrowdYwx = res.data;
          }
        });
      },
      // 获取产品
      getCrowdCp(ywxbm) {
        this.$get(this.API.getCrowdCp, {
          ywxbm: ywxbm
        }).then(res => {
          if (res.state == 'success') {
            this.CrowdCp = res.data;
          }
        });
      },
      // 关键字查询
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          this.queryUser(query);
        } else {
          this.kfgcsList = [];
        }
      },
      // 查询用户
      queryUser(keyword) {
      	queryUser({
      		curPage: 1,
      		pageSize: 10,
      		Isexternal: false,
      		keyword: keyword
      	}).then(({ data }) => {
      		if (data.state == 'success') {
      			this.kfgcsList = data.data.rows;
            this.loading = false;
      		}
      	});
      }
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: '提报Crwod任务'
      },
      Type:{
        type:String,
        default:''
      }
    },
    watch: {
      show(n, o) {
        this.visible = this.show;
        if (this.show) {
          this.$nextTick(() => {
            $("#summernoteT").summernote({
              dialogsInBody: true,
              placeholder: "请输入内容",
              focus: true,
              height: 200,
              width: 100+'%',
              minHeight: 200,
              lang: "zh-CN",
              toolbar: [
                ["style", ["bold", "italic", "underline", "clear"]],
                ["font", ["strikethrough", "superscript", "subscript"]],
                ["fontsize", ["fontsize"]],
                ["color", ["color"]],
                ["para", ["ul", "ol", "paragraph"]],
                ["height", ["height"]],
                ["picture"],
                ["link", ["linkDialogShow", "unlink"]]
              ]
            });
          });

          if (!getSession('CrowdDemandType')) {
            getMenu('CrowdDemandType', this.CrowdDemandList); //获取需求分类
          } else {
            this.CrowdDemandList = getSession('CrowdDemandType');
          }
          this.getCrowdYwx();
          this.queryUser();
        }
      }
    },
    components: {
      uploadFile
    }
  }
</script>

<style scoped>
  .send_crowd img {
    width: 100%;
  }

  .send-crowd_topic {
    border: 1px solid #e4eaec;
    background: #f3f7f9;
    border-radius: 3px;
    height: 40px;
    line-height: 40px;
    padding: 0 6px;
  }

  .crowd-rqgz h4 {
    font-weight: 700;
    font-size: 13px;
    margin: 10px 0 !important;
  }

  .crowd-rqgz p {
    font-size: 12px;
    text-indent: 2em;
  }
</style>
