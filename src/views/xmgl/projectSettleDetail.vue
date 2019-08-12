<template>
  <div>
    <div class="jsdetail_container">
      <div class="fb_info">
        <div>
          <h4>项目结算详情</h4>
          <div text-right v-if="jssqData.jszt == '02' || jssqData.jszt == '01' || jssqData.jszt == '04' ">
            <el-button size="small" type="danger" @click="handleSave">保存</el-button>
          </div>
          <div>
            <h5>历史结算信息</h5>
            <table>
              <tr>
                <th>分包结算次数</th>
                <td>{{ jsxx.jscs }}</td>
                <th>中标总金额（元）</th>
                <td>{{ jsxx.zbzfy }}</td>
                <th>已结算金额（元）</th>
                <td>{{ jsxx.yjszfy }}</td>
              </tr>
              <tr>
                <th>剩余结算金额（元）</th>
                <td>{{ jsxx.syjsje }}</td>
                <th>团队结算金额（元）</th>
                <td>{{ jsxx.yjstdfy }}</td>
              </tr>
            </table>
          </div>

          <div>
             <h5>冲账信息</h5>
             <el-table
              :data="jsczData"
              border
              style="width: 100%"
            >

              <el-table-column prop="dqjd" label="结算点" min-width="140"></el-table-column>
              <el-table-column prop="jsrq" label="结算时间" width="100"></el-table-column>
              <el-table-column prop="cybh" label="工号" width="110"></el-table-column>
              <el-table-column prop="cymc" label="姓名" width="110"></el-table-column>
              <el-table-column prop="yjsssfy" label="结算实施金额" width="110"></el-table-column>
              <el-table-column prop="yjsekfy" label="结算二开金额" width="110"></el-table-column>
              <el-table-column prop="yjskbfy" label="结算可变金额" width="110"></el-table-column>
              <el-table-column prop="jlje" label="奖励金额" width="90"></el-table-column>
              <el-table-column prop="cfje" label="惩罚金额" width="150" show-overflow-tooltip></el-table-column>
              <el-table-column prop="hj" label="合计" width="90"></el-table-column>
              <el-table-column prop="zsssfy" label="折算实施费用" width="110" show-overflow-tooltip></el-table-column>
              <el-table-column prop="zsekfy" label="折算二开费用" width="110" show-overflow-tooltip></el-table-column>
              <el-table-column prop="zskbfy" label="折算可变费用" width="110" show-overflow-tooltip></el-table-column>
              <el-table-column prop="zshj" label="折算合计费用" width="110" show-overflow-tooltip></el-table-column>

            </el-table>
          </div>

          <div>
            <h5>结算申请信息</h5>
            <table>
              <tr>
                <th>项目名称</th>
                <td colspan="5">{{jsxx.xmmc}}</td>
              </tr>
              <tr>
                <th>分包名称</th>
                <td colspan="5">{{jsxx.fbmc}}</td>
              </tr>
							 <tr>
							  <th>分包计划开始日期</th>
							  <td>{{jsxx.jhksrq}}</td>
							  <th>分包计划结束日期</th>
							  <td>{{jsxx.jhjsrq}}</td>
							  <th>分包日期</th>
							  <td>{{jsxx.fbrq}}</td>
							</tr>
              <tr>
                <th>中标人</th>
                <td>{{jsxx.zbrmc}}</td>
                <th>申请人</th>
                <td>{{jssqData.jsrmc}}</td>
                <th>申请时间</th>
                <td>{{jssqData.jsrq}}</td>
              </tr>
              <tr>
                <th>实际开始日期</th>
                <td>{{jssqData.sjkssj}}</td>
                <th>实际结束日期</th>
                <td>{{jssqData.sjjssj}}</td>
                <th>结算点</th>
                <td>{{jssqData.lcbmc}}</td>
              </tr>
              <tr>
                <th>申请说明</th>
                <td colspan="5" height="80px">{{jssqData.sm}}</td>
              </tr>
            </table>
          </div>
          <div>
            <h5>本次结算信息</h5>
            <table>
              <tr>
                <th>本次可结算总金额（元）</th>
                <td>{{!jsxx.syjsje?0:jsxx.syjsje}}</td>
                <th>本次已结算总金额（元）</th>
                <td colspan="3">{{!jsxx.sjzfy?0:jsxx.sjzfy}}</td>
              </tr>
              <tr>
                <th>中标实施费用（元）</th>
                <td>{{jsxx.zbssfy}}</td>
                <th>中标二开费用（元）</th>
                <td>{{jsxx.zbekfy}}</td>
                <th>中标可变费用（元）</th>
                <td>{{jsxx.zbkbfy}}</td>
              </tr>
              <tr>
                <th>已结算实施费用（元）</th>
                <td>{{jsxx.yjsssfy}}</td>
                <th>已结算二开费用（元）</th>
                <td>{{jsxx.yjsekfy}}</td>
                <th>已结算可变费用（元）</th>
                <td>{{jsxx.yjskbfy}}</td>
              </tr>
              <tr>
                <th>预留实施费用（元）</th>
                <td>
                  <input
                    v-model="jsxx.ylssfy"
                    style="width: 100%;"
                    type="number"
                    @input="handleInputfy('0')"
                  >
                </td>
                <th>预留二开费用（元）</th>
                <td>
                  <input
                    v-model="jsxx.ylekfy"
                    style="width: 100%;"
                    type="number"
                    @input="handleInputfy('1')"
                  >
                </td>
                <th>预留可变费用（元）</th>
                <td>
                  <input
                    v-model="jsxx.ylkbfy"
                    style="width: 100%;"
                    type="number"
                    @input="handleInputfy('2')"
                  >
                </td>
              </tr>
              <tr>
                <th>实施调用费用（元）</th>
                <td colcenter spacebetween style="border:none !important">
                  <span>{{!jsxx.rlssfy?0:jsxx.rlssfy}}</span>
                  <i title="设置费用" class="el-icon-edit-outline" @click="handleSettleMoney('0')"></i>
                </td>
                <th>二开调用费用（元）</th>
                <td colcenter spacebetween style="border:none !important">
                  <span>{{!jsxx.rlekfy?0:jsxx.rlekfy}}</span>
                  <i title="设置费用" class="el-icon-edit-outline" @click="handleSettleMoney('1')"></i>
                </td>
                <th>可变报销费用（元）</th>
                <td colcenter spacebetween style="border:none !important">
                  <span>{{!jsxx.rlkbfy?0:jsxx.rlkbfy}}</span>
                  <i title="设置费用" class="el-icon-edit-outline" @click="handleSettleMoney('2')"></i>
                </td>
              </tr>
              <tr>
                <th>本次结算实施费用（元）</th>
                <td>
                  <input
                    style="width: 100%;"
                    type="number"
                    v-model="jsxx.sjssfy"
                    @input="handleSettleBcjsfy('0')"
                  >
                </td>
                <th>本次结算二开费用（元）</th>
                <td>
                  <input
                    style="width: 100%;"
                    type="number"
                    v-model="jsxx.sjekfy"
                    @input="handleSettleBcjsfy('1')"
                  >
                </td>
                <th>本次结算可变费用（元）</th>
                <td>
                  <input
                    style="width: 100%;"
                    type="number"
                    v-model="jsxx.sjkbfy"
                    @input="handleSettleBcjsfy('2')"
                  >
                </td>
              </tr>
              <tr>
                <th>预留说明</th>
                <td colspan="5">
                  <textarea
                    v-model="jsxx.sm"
                    placeholder="请输入预留说明"
                    style="width: 100%;padding: 5px;"
                    rows="3"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <th>奖励金额（元）</th>
								<td>{{!jsxx.jlje?0:jsxx.jlje}}</td>
               <!-- <td>
                  <input
                    style="width: 100%;"
                    type="number"
                    v-model="jsxx.jlje"
                    @input="handleInputfy"
                  >
                </td> -->
                <th>惩罚金额（元）</th>
								<td>{{!jsxx.cfje?0:jsxx.cfje}}</td>
            <!--    <td colspan="3">
                  <input
                    style="width: 100%;"
                    type="number"
                    v-model="jsxx.cfje"
                    @input="handleInputfy"
                  >
                </td> -->
              </tr>
              <tr>
                <th>奖惩说明</th>
                <td colspan="5">
                  <textarea
                    v-model="jsxx.jlsm"
                    placeholder="请输入奖惩说明"
                    style="width: 100%;padding: 5px;"
                    rows="3"
                  ></textarea>
                </td>
              </tr>
            </table>
          </div>
          <div>
            <h5>个人结算信息</h5>
            <table class="table_center">
              <tr>
                <th>工号</th>
                <th>姓名</th>
                <th>负责业务线</th>
                <th>结算实施金额</th>
                <th>结算二开金额</th>
                <th>结算可变金额</th>
								<th>奖励金额</th>
								<th>惩罚金额</th>
                <th>合计</th>
                <th>折算实施费用</th>
                <th>折算二开费用</th>
                <th>折算可变费用</th>
                <th>折算合计费用</th>
              </tr>
              <tr v-for="(item,index) in tdywyData" :key="index">
                <td :colspan="item.cybh == '合计'?3:0">{{item.cybh}}</td>
                <td v-if="item.cybh != '合计'">{{item.cymc}}</td>
                <td v-if="item.cybh != '合计'">{{item.ywymc}}</td>
                <td>{{item.jsssfy}}</td>
                <td>{{item.jsekfy}}</td>
                <td>{{item.jskbfy}}</td>

								<td>
								  <input
                    v-model="item.jlje"
                    type="number"
                    style="width: 80px;"
                    @input="handleChangeJcje(index,'jl')"
										v-if="item.cybh != '合计'"
                  >
									<span v-else>{{item.jlje}}</span>
								</td>
								<td>
									<input
									  v-model="item.cfje"
									  type="number"
									  style="width: 80px;"
									  @input="handleChangeJcje(index,'cf')"
										v-if="item.cybh != '合计'"
									>
									<span v-else>{{item.cfje}}</span>
								</td>

                <td>{{!item.jsje?0:item.jsje}}</td>

                <td>{{ !item.zsssfy?0:item.zsssfy }}</td>
                <td>{{ !item.zsekfy?0:item.zsekfy }}</td>
                <td>{{ !item.zskbfy?0:item.zskbfy }}</td>
                <td>{{ !item.zsje?0:item.zsje }}</td>
              </tr>
               <tr v-if="!tdywyData.length">
                <td colspan="13">暂无内容</td>
              </tr>
            </table>
          </div>
          <div>
            <h5>本次团队结算信息</h5>
            <p style="color:#f00;font-size: 12px;">
              <br>结算总金额包含团队结算费用; 实际实施费用指二开实施费用；实际二开费用指二开开发费用；实际可变费用指报销费用;
            </p>
            <table class="table_center">
              <tr>
                <th>业务域</th>
                <th>合同内容</th>
                <th>责任人</th>
                <th>中标实施费用(元)</th>
                <th>已结算实施费用(元)</th>
                <th>本次结算实施费用(元)</th>
                <th>中标二开费用(元)</th>
                <th>已结算二开费用(元)</th>
                <th>本次结算二开费用(元)</th>
                <th>中标可变费用(元)</th>
                <th>已结算可变费用(元)</th>
                <th>本次结算可变费用(元)</th>
                <th>本次合计结算</th>

                <th>折算实施费用</th>
                <th>折算二开费用</th>
                <th>折算可变费用</th>
                <th>折算合计费用</th>
              </tr>
              <tr v-if="!tdxxData.length">
                <td colspan="17">暂无内容</td>
              </tr>
              <tr v-for="(item, index) in tdxxData" :key="index">
                <td>{{item.ywymc}}</td>
                <td style="width: 300px;">{{item.cpmc}}</td>
                <td>{{item.cymc}}</td>
                <td>{{item.zbssfy}}</td>
                <td>{{item.yjsssfy}}</td>
                <td>
                  <input
                    v-model="item.jsssfy"
                    type="number"
                    style="width: 80px;"
                    @input="handleChangeInput(index,'ss')"
                  >
                </td>
                <td>{{item.zbekfy}}</td>
                <td>{{item.yjsekfy}}</td>
                <td>
                  <input
                    v-model="item.jsekfy"
                    type="number"
                    style="width: 80px;"
                    @input="handleChangeInput(index,'ek')"
                  >
                </td>
                <td>{{item.zbkbfy}}</td>
                <td>{{item.yjskbfy}}</td>
                <td>
                  <input
                    v-model="item.jskbfy"
                    type="number"
                    style="width: 80px;"
                    @input="handleChangeInput(index,'kb')"
                  >
                </td>
                <td>{{ !item.jsje?0:item.jsje }}</td>

                <td>{{ !item.zsssfy?0:item.zsssfy }}</td>
                <td>{{ !item.zsekfy?0:item.zsekfy }}</td>
                <td>{{ !item.zskbfy?0:item.zskbfy }}</td>
                <td>{{ !item.zsje?0:item.zsje }}</td>
              </tr>
            </table>
          </div>

          <div>
              <h5>审核记录</h5> 
              <el-table
              :data="shjlList"
              border
              style="width: 100%"
            >
              <el-table-column prop="czsj" label="时间" width="180"></el-table-column>
              <el-table-column prop="czrxm" label="操作人" width="100"></el-table-column>
              <el-table-column prop="czlxmc" label="操作" show-overflow-tooltip></el-table-column>
              <el-table-column prop="czms" label="说明" show-overflow-tooltip></el-table-column>
            </el-table>    
          </div>
        </div>
      </div>
    </div>

    <el-dialog :title="title" :visible.sync="dialogVisible" width="80%">
      <div class="pd-10">
        <div>
          <span class="filter-weight">承担人：</span>
          <el-radio-group v-model="cdradio">
            <el-radio :label="0">区域承担</el-radio>
            <el-radio :label="1">分包扣除</el-radio>
          </el-radio-group>&#x3000;
          <el-button
            :disabled="!wids.length"
            type="primary"
            size="mini"
            @click="handleMultipleSet"
          >批量设置</el-button>
        </div>
        <p
          style="color: #f00;margin:10px 0 !important; "
        >总金额：{{!cdfyData.zje?0:cdfyData.zje}}元，区域承担：{{!cdfyData.qycd?0:cdfyData.qycd}}元，分包扣除：{{!cdfyData.fbcd?0:cdfyData.fbcd}}元</p>
        <el-table
          v-if="jsSource != 2"
          :data="tableData"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="承担人" width="100">
            <template slot-scope="scope">
              <span>{{scope.row.rlzt=='0'?'区域承担':scope.row.rlzt=='1'?'分包扣除':''}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="wid" label="单据编号" width="180"></el-table-column>
          <el-table-column prop="kfxzmc" label="开发性质" width="100"></el-table-column>
          <el-table-column prop="fwlxmc" label="服务类型" width="100"></el-table-column>
          <el-table-column prop="ztmc" label="状态" width="100"></el-table-column>
          <el-table-column prop="ssywxmc" label="业务线" min-width="250"></el-table-column>
          <el-table-column prop="zbje" label="中标金额" width="100"></el-table-column>
          <el-table-column prop="xqfmc" label="需求方" width="100"></el-table-column>
          <el-table-column prop="zbjzrq" label="招标截止日期" width="140"></el-table-column>
          <el-table-column prop="jfrq" label="交付日期" width="140"></el-table-column>
          <el-table-column prop="zbrmc" label="中标人" width="100"></el-table-column>
          <el-table-column prop="zbsj" label="中标时间" width="140"></el-table-column>
        </el-table>

        <el-table
          v-if="jsSource == 2"
          :data="tableData"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="承担人" width="100">
            <template slot-scope="scope">
              <span>{{scope.row.rlzt=='0'?'区域承担':scope.row.rlzt=='1'?'分包扣除':''}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="djbh" label="单据编号" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="djzt" label="状态" width="100"></el-table-column>
          <el-table-column prop="kmbh" label="科目编号" width="100"></el-table-column>
          <el-table-column prop="kmmc" label="科目名称" min-width="250" show-overflow-tooltip></el-table-column>
          <el-table-column prop="je" label="金额" width="100"></el-table-column>
          <el-table-column prop="bxsqrq" label="申请日期" width="110"></el-table-column>
          <el-table-column prop="bxwcrq" label="完成日期" width="160"></el-table-column>
          <el-table-column prop="bxrmc" label="报销人" width="90"></el-table-column>
          <el-table-column prop="bxrbmmc" label="报销人部门" width="150" show-overflow-tooltip></el-table-column>
          <el-table-column prop="fycdrmc" label="承担人" width="90"></el-table-column>
          <el-table-column prop="fycdrbmmc" label="承担人部门" width="150" show-overflow-tooltip></el-table-column>
        </el-table>

        <br>
        <div slot="footer" text-right>
          <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
          <el-button size="mini" type="primary" @click="handleSettleDyfy">确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { xxs } from "@/utils/util";
export default {
  data() {
    return {
      dialogVisible: false,
      title: "",
      tableData: [],
      tdywyData: [], //团队业务域列表
      jsxx: {}, //结算详情
      jssqData: {}, //结算申请
      tdxxData: [],
      jsczData:[],
      shjlList:[],//审核记录列表
      tbje: null,
      zbxx: "",
      // 承担费用
      cdradio: 1, //承担
      wids: [],
      jsSource: "",
      url: "",
      cdfyData: {},
      jsssfyTotal: 0 //结算实施总金额
    };
  },
  mounted() {
    this.queryJsxq();
  },
  methods: {
    // 计算本次总金额
    handleSettleBcjsfy(type) {
      if (type == "0") {
				if(Number(this.jsxx.sjssfy) > Number(this.jsxx.zbssfy)){
					 this.$message({
					  message: "中标实施费用必须 大于 本次结算实施费用 ",
					  type: "warning"
					});
					this.jsxx.sjssfy = 0;
				}
				if((Number(this.jsxx.sjssfy) + Number(this.jsxx.rlssfy) + Number(this.jsxx.ylssfy) + Number(this.jsxx.yjsssfy)) > Number(this.jsxx.zbssfy)){
					this.$message({
					  message: "本次结算实施费用过高，请重新填写~",
					  type: "warning"
					});
					 this.jsxx.sjssfy = 0;
				}
      }
      if (type == "1") {
				if(Number(this.jsxx.sjekfy) > Number(this.jsxx.zbekfy)){
					this.$message({
					  message: "中标二开费用必须 大于 本次结算二开费用",
					  type: "warning"
					});
					this.jsxx.sjekfy = 0;
				}
				if((Number(this.jsxx.sjekfy) + Number(this.jsxx.rlekfy) + Number(this.jsxx.ylekfy) + Number(this.jsxx.yjsekfy)) > Number(this.jsxx.zbekfy)){
					this.$message({
					  message: "本次结算二开费用过高，请重新填写~",
					  type: "warning"
					});
					 this.jsxx.sjekfy = 0;
				}
      }
      if (type == "2") {
				if(Number(this.jsxx.sjkbfy) > Number(this.jsxx.zbkbfy)){
					this.$message({
					  message: "中标可变费用必须 大于 本次结算可变费用 ",
					  type: "warning"
					});
					this.jsxx.sjkbfy = 0;
				}
				if((Number(this.jsxx.sjkbfy) + Number(this.jsxx.rlkbfy) + Number(this.jsxx.ylkbfy) + Number(this.jsxx.yjskbfy)) > Number(this.jsxx.zbkbfy)){
					this.$message({
					  message: "本次结算可变费用过高，请重新填写~",
					  type: "warning"
					});
					this.jsxx.sjkbfy = 0;
				}
      }

      // this.jsxx.jsje =
      //   Number(this.jsxx.sjssfy) +
      //   Number(this.jsxx.sjekfy) +
      //   Number(this.jsxx.sjkbfy) +
      //   Number(this.jsxx.jlje) -
      //   Number(this.jsxx.cfje);
      // this.jsxx.jsje = this.jsxx.jsje < 0 ? 0 : this.jsxx.jsje;

			// 本次已结算金额加上奖励-惩罚  把奖励和惩罚加到已结算总金额，小于0，不处理。
			this.jsxx.sjzfy =
			  Number(this.jsxx.sjssfy) +
			  Number(this.jsxx.sjekfy) +
			  Number(this.jsxx.sjkbfy);
			this.jsxx.sjzfy = this.jsxx.sjzfy < 0 ? 0 : this.jsxx.sjzfy;
    },

    // 计算本次结算总金额
    handleInputfy(type) {
      switch (type) {
        case "0":
          this.jsxx.sjssfy =
            Number(this.jsxx.zbssfy) -
            Number(this.jsxx.yjsssfy) -
            Number(this.jsxx.ylssfy) -
            Number(!this.jsxx.rlssfy ? 0 : this.jsxx.rlssfy);
          this.jsxx.sjssfy = this.jsxx.sjssfy < 0 ? 0 : this.jsxx.sjssfy;
          break;
        case "1":
          this.jsxx.sjekfy =
            Number(this.jsxx.zbekfy) -
            Number(this.jsxx.yjsekfy) -
            Number(this.jsxx.ylekfy) -
            Number(!this.jsxx.rlekfy ? 0 : this.jsxx.rlekfy);
          this.jsxx.sjekfy = this.jsxx.sjekfy < 0 ? 0 : this.jsxx.sjekfy;
          break;
        case "2":
          this.jsxx.sjkbfy =
            Number(this.jsxx.zbkbfy) -
            Number(this.jsxx.yjskbfy) -
            Number(this.jsxx.ylkbfy) -
            Number(!this.jsxx.rlkbfy ? 0 : this.jsxx.rlkbfy);
          this.jsxx.sjkbfy = this.jsxx.sjkbfy < 0 ? 0 : this.jsxx.sjkbfy;
          break;
        default:
          break;
      }
    },
    // 保存
    handleSave() {
      let xmtdData = [],ekfy = 0,kbfy = 0,msg = "";
			let grjsData = [];
      this.tdxxData.forEach(ele => {
        xmtdData.push({
          fbbh: this.jssqData.fbbh,
          lcbbh: this.jssqData.lcbbh,
          lcbmc: this.jssqData.lcbmc,
          cpmc: ele.cpmc,
          tdwid: ele.tdwid,
          cybh: ele.cybh,
          cymc: ele.cymc,
          jsssfy: ele.jsssfy,
          jsekfy: ele.jsekfy,
          jskbfy: ele.jskbfy,
          jsje: ele.jsje
        });
        ekfy += !ele.jsekfy ? 0 : Number(ele.jsekfy);
        kbfy += !ele.jskbfy ? 0 : Number(ele.jskbfy);
      });

			this.tdywyData.forEach(ele => {
				if(ele.cymc != '合计'){
					grjsData.push({
					  fbbh: this.jssqData.fbbh,
					  lcbbh: this.jssqData.lcbbh,
					  lcbmc: this.jssqData.lcbmc,
					  cybh: ele.cybh,
					  cymc: ele.cymc,
					  jlje: ele.jlje,
						cfje: ele.cfje
					});
				}
			});

      this.$message.close();

      // 个人结算实施费用
      if (this.jsxx.sjssfy != this.jsssfyTotal) {
        msg += "本次结算实施费用必须等于团队结算实施金额合计！<br>";
      }
      // 个人结算二开费用=结算二开费用 * 5400 / 8800
      if (this.jsxx.sjekfy != ekfy) {
        msg += "本次结算二开费用必须等于团队结算二开金额合计！<br>";
      }
      // 个人结算可变费用= 结算可变费用 * 70%;
      if (this.jsxx.sjkbfy != kbfy) {
        msg += "本次结算可变费用必须等于团队结算可变金额合计！<br>";
      }

      if (!!msg) {
        this.$alert('<strong style="color:#f00">' + msg + "</strong>", "提示", {
          dangerouslyUseHTMLString: true
        });
        return;
      }

      this.$post(this.API.saveJsFeeData, {
        wid: !this.jsxx.wid ? "" : this.jsxx.wid,
        fbbh: this.jssqData.fbbh,
        lcbbh: this.jssqData.lcbbh,
        lcbmc: this.jssqData.lcbmc,

        jlje: !this.jsxx.jlje ? 0 : this.jsxx.jlje,
        cfje: !this.jsxx.cfje ? 0 : this.jsxx.cfje,

        jsje: this.jsxx.jsje,
        sm: xxs(this.jsxx.sm),
        jlsm: xxs(this.jsxx.jlsm),

        ylssfy: Number(this.jsxx.ylssfy),
        ylekfy: Number(this.jsxx.ylekfy),
        ylkbfy: Number(this.jsxx.ylkbfy),

        rlssfy: Number(this.jsxx.rlssfy),
        rlekfy: Number(this.jsxx.rlekfy),
        rlkbfy: Number(this.jsxx.rlkbfy),

				// 本次结算实施费用
        sjssfy: Number(this.jsxx.sjssfy),
        sjekfy: Number(this.jsxx.sjekfy),
        sjkbfy: Number(this.jsxx.sjkbfy),

        teamFeeList: JSON.stringify(xmtdData),
				teamJcList: JSON.stringify(grjsData)
      }).then(res => {
        if (res.state == "success") {
          this.$message({
            message: "保存成功",
            type: "success"
          });
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
    },

    // 计算调用费用(确定)
    handleSettleDyfy() {
      if (this.jsSource == "0") {
        this.jsxx.rlssfy = !this.cdfyData.fbcd ? 0 : this.cdfyData.fbcd;
      } else if (this.jsSource == "1") {
        this.jsxx.rlekfy = !this.cdfyData.fbcd ? 0 : this.cdfyData.fbcd;
      } else {
        this.jsxx.rlkbfy = !this.cdfyData.fbcd ? 0 : this.cdfyData.fbcd;
      }
      this.handleInputfy(this.jsSource);
      // 设置结算归属
      this.$post(this.API.setSettlementFeeAttribution, {
        xmbh: this.jsxx.xmbh,
        jssqwid: this.jssqData.wid,
        jsFySource: this.jsSource
      }).then(res => {
        if (res.state == "success") {
        } else {}
      });
      this.dialogVisible = false;
    },

    // 批量设置
    handleSelectionChange(val) {
			this.wids = [];
      val.forEach(ele => {
        this.wids.push(ele.wid);
      });
    },
    // 批量摄者承担人
    handleMultipleSet() {
      this.$post(this.API.batchSetJsFySource, {
        wids: this.wids.join(","),
        jssqwid: this.jssqData.wid,
        cdlx: this.cdradio,
        jsFySource: this.jsSource
      }).then(res => {
        if (res.state == "success") {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.querySettleMoney(this.jsSource);
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
    },
    // 计算结算费用
    handleSettleMoney(data) {
      this.jsSource = data;
      switch (data) {
        case "0":
          this.title = "本次结算实施费用";
          this.url = this.API.querySsfy;
          break;
        case "1":
          this.title = "本次结算二开费用";
          this.url = this.API.queryEkfy;
          break;
        case "2":
          this.title = "本次结算可变费用";
          this.url = this.API.queryBxfy;
          break;
        default:
          break;
      }
      this.querySettleMoney(data);
      this.dialogVisible = !this.dialogVisible;
    },
    // 金额计算
    querySettleMoney(type) {
      this.$get(this.url, {
        xmbh: this.jsxx.xmbh,
        jssqwid: this.jssqData.wid
      }).then(res => {
        if (res.state == "success") {
          this.cdfyData = res.data;
          this.tableData = !res.data.tableData ? [] : res.data.tableData;
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
    },

		// 奖励，惩罚 （个人信息结算）
		handleChangeJcje(index,type){
			let jljeTotal = 0,
			    cfjeTotal = 0;
			  this.tdywyData.forEach((ele, _j, arr) => {
					if(ele.cybh != '合计'){
						jljeTotal += Number(ele.jlje);
						cfjeTotal += Number(ele.cfje);
					}
			  // 个人结算信息合计
			  if (ele.cybh == "合计") {
						 this.tdywyData[_j].jlje = jljeTotal;
						 this.tdywyData[_j].cfje = cfjeTotal;
			  }
			});
			this.jsxx.jlje = jljeTotal;
			this.jsxx.cfje = cfjeTotal;

		},


    // 实施，二开，可变（团队结算信息）
    handleChangeInput(index, type) {
      this.jsssfyTotal = 0;
      let  jsekfyTotal = 0,
           jskbfyTotal = 0,
           zsssfyTotal = 0, //折算实施总费用
           zsekfyTotal = 0, //折算二开总费用
           zskbfyTotal = 0, //折算可变总费用
           zsjeTotal = 0; // 折算合计费用
      this.tdxxData[index].zsssfy = 0;
      this.tdxxData[index].zsekfy = 0;
      this.tdxxData[index].zskbfy = 0;
      this.tdxxData[index].zsje = 0;

      this.tdxxData[index].jsje = Number(this.tdxxData[index].jsssfy) + Number(this.tdxxData[index].jsekfy) +Number(this.tdxxData[index].jskbfy);

      // 折算实施费用
      this.tdxxData[index].zsssfy = Number(this.tdxxData[index].jsssfy);
      // 折算实施费用
      this.tdxxData[index].zsekfy = Math.ceil(Number(this.tdxxData[index].jsekfy) * 5400 / 8800);
      // 折算实施费用
      this.tdxxData[index].zskbfy = Math.ceil(Number(this.tdxxData[index].jskbfy) * 0.7);
      // 折算合计费用
      this.tdxxData[index].zsje = Number(this.tdxxData[index].zsssfy) + Number(this.tdxxData[index].zsekfy) + Number(this.tdxxData[index].zskbfy);

      this.tdxxData.forEach(ele => {
        this.jsssfyTotal += !ele.jsssfy ? 0 : Number(ele.jsssfy);
        jsekfyTotal += !Number(ele.jsekfy) ? 0 : Number(ele.jsekfy); //团队结算二开总费用
        jskbfyTotal += !Number(ele.jskbfy) ? 0 : Number(ele.jskbfy); //团队结算可变总费用

        zsssfyTotal += !Number(ele.zsssfy) ? 0 : Number(ele.zsssfy);
        zsekfyTotal += !Number(ele.zsekfy) ? 0 : Number(ele.zsekfy);
        zskbfyTotal += !Number(ele.zskbfy) ? 0 : Number(ele.zskbfy);
        zsjeTotal += !Number(ele.zsje) ? 0 : Number(ele.zsje);
        // this.jsxx.yjszfy += Number(ele.jsje); //已结算总费用 计算
      });


        // 团队个人结算
      this.tdywyData.forEach((ele, _j, arr) => {
        this.tdywyData[_j].jsssfy = this.tdywyData[_j].jsekfy = this.tdywyData[_j].jskbfy = this.tdywyData[_j].jsje = 0;
        this.tdywyData[_j].zsssfy = this.tdywyData[_j].zsekfy = this.tdywyData[_j].zskbfy = this.tdywyData[_j].zsje = 0;
        this.tdxxData.forEach((element, i, arr) => {
          if (ele.cybh == element.cybh) {
            this.tdywyData[_j].jsssfy += Number(element.jsssfy);
            this.tdywyData[_j].jsekfy += Number(element.jsekfy);
            this.tdywyData[_j].jskbfy += Number(element.jskbfy);
            this.tdywyData[_j].jsje += Number(this.tdxxData[i].jsje);

            // 折算实施费用
            this.tdywyData[_j].zsssfy += Number(element.jsssfy);
            // 折算二开费用
            this.tdywyData[_j].zsekfy += Math.ceil(Number(element.jsekfy) * 5400 / 8800);
            // 折算可变费用
            this.tdywyData[_j].zskbfy += Math.ceil(Number(element.jskbfy) * 0.7);
            // 折算合计费用
            this.tdywyData[_j].zsje += Number(this.tdywyData[_j].zsssfy)+Number(this.tdywyData[_j].zsekfy)+Number(this.tdywyData[_j].zskbfy);

          }
        });
        // 个人结算信息合计
        if (ele.cybh == "合计") {
          this.tdywyData[_j].jsssfy = this.jsssfyTotal;
          this.tdywyData[_j].jsekfy = jsekfyTotal;
          this.tdywyData[_j].jskbfy = jskbfyTotal;
          this.tdywyData[_j].jsje += this.jsssfyTotal + jsekfyTotal + jskbfyTotal;

          this.tdywyData[_j].zsssfy = zsssfyTotal;
          this.tdywyData[_j].zsekfy = zsekfyTotal;
          this.tdywyData[_j].zskbfy = zskbfyTotal;
          this.tdywyData[_j].zsje = zsjeTotal;
        }
      });

    },

    // 获取结算申请详情
    queryJsxq() {
      this.$get(this.API.queryJsxq, {
        jssqwid: this.$route.query.wid,
        fbbh: this.$route.query.fbbh
      }).then(res => {
        if (res.state == "success") {
          this.shjlList =  !res.data.fbshjl?[]:res.data.fbshjl;
          this.jssqData = res.data.jssqData;
          this.tdxxData = !res.data.jstdData ? [] : res.data.jstdData;
          this.jsczData = !res.data.jsczData ? [] : res.data.jsczData;
          this.tdywyData = !res.data.jstdYwyData ? [] : res.data.jstdYwyData; //个人结算信息

          this.jsxx = res.data.jsxx;
          this.jsxx.ylssfy = !this.jsxx.ylssfy ? 0 : this.jsxx.ylssfy;
          this.jsxx.ylekfy = !this.jsxx.ylekfy ? 0 : this.jsxx.ylekfy;
          this.jsxx.ylkbfy = !this.jsxx.ylkbfy ? 0 : this.jsxx.ylkbfy;

          // this.jsxx.sjssfy = (Number(this.jsxx.zbssfy) - Number(this.jsxx.yjsssfy) - Number(this.jsxx.ylssfy) - Number(!this.jsxx.rlssfy?0:this.jsxx.rlssfy));
          // this.jsxx.sjssfy = this.jsxx.sjssfy < 0?0:this.jsxx.sjssfy ;
          // this.jsxx.sjekfy = (Number(this.jsxx.zbekfy) - Number(this.jsxx.yjsekfy) - Number(this.jsxx.ylekfy) - Number(!this.jsxx.rlekfy?0:this.jsxx.rlekfy));
          // this.jsxx.sjekfy = this.jsxx.sjekfy < 0?0:this.jsxx.sjekfy ;
          // this.jsxx.sjkbfy = (Number(this.jsxx.zbkbfy) - Number(this.jsxx.yjskbfy) - Number(this.jsxx.ylkbfy) - Number(!this.jsxx.rlkbfy?0:this.jsxx.rlkbfy));
          // this.jsxx.sjkbfy = this.jsxx.sjkbfy < 0?0:this.jsxx.sjkbfy ;
          //
          // this.jsxx.jsje = (Number(this.jsxx.sjssfy) + Number(this.jsxx.sjekfy) + Number(this.jsxx.sjkbfy) + Number(this.jsxx.jlje) - Number(this.jsxx.cfje));
          // this.jsxx.jsje = this.jsxx.jsje <0?0:this.jsxx.jsje;

          // 团队实施费用
          this.tdxxData.forEach(ele => {
            this.jsssfyTotal += !ele.jsssfy ? 0 : Number(ele.jsssfy);
          });


        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
    }
  },
  activated() {},
  components: {}
};
</script>
<style scoped>
.jsdetail_container {
  width: 90%;
  margin: 20px auto;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 0;
  background: #fff;
  position: relative;
}

.fb_info {
  padding: 15px 20px;
}
.fb_info h5 {
  color: #999;
  font-size: 13px;
  margin: 10px 0 !important;
  font-weight: 700;
}

.fb_info a {
  color: #2196f3;
}

.fb_info table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #e9ecf4;
  font-size: 14px;
}
.fb_info table th {
  font-size: 14px;
  text-align: center;
  width: 180px;
  background: #f4f6f9;
  color: #4d4d4d;
}
.fb_info table td,
.fb_info table th {
  text-align: left;
  border: 1px solid #e9ecf4 !important;
  padding: 5px 10px;
}
.fb_info h4 {
  border-left: 5px solid #cd69c9;
  padding: 0 5px;
  font-weight: 700;
  margin-bottom: 10px !important;
}

.table_center tr th,
.table_center tr td {
  text-align: center;
}

.el-icon-edit-outline:hover {
  cursor: pointer;
}
</style>
