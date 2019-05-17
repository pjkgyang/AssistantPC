<template>
  <div class="xxts-pannel">
    <h4>{{dwmc}}</h4>
    <section class="xxts-pannel_sort">
      <h5>统计情况</h5>
      <div flex spacearound class="mg-12">
        <section @click="handleCheckDetail(item.type,item.value)" v-for="item in sortList" center 
        :class="{'sort_circle':true,'active-hover':item.mc!='总工时' , 'circle_xms':item.mc=='项目数','circle_wts':item.mc=='问题数','circle_zgs':item.mc=='总工时','circle_yqs':item.mc=='延期任务','circle_fk':item.type=='fk'}">
          <p v-if="item.type != 'fk'">
            <span class="nums">{{item.value}}</span>
            <span>{{item.mc=='总工时'?'(小时)':'(个)'}}</span><br>
            <span>{{item.mc}}</span>
          </p>
          <p v-if="item.type == 'fk'" style="font-size:12px">
            <span>{{item.mcyfk}}</span><br>
            <span class="nums" style="font-size:14px">
              {{item.yfk<10000?item.yfk:item.yfk<100000000?(item.yfk/10000).toFixed(2):(item.yfk/100000000).toFixed(2)}} </span>{{item.yfk <10000?'元':item.yfk<100000000?'万元':'亿'}}
            </span>
            <br>
            <span>{{item.mcdfk}}</span><br>
            <span class="nums" style="font-size:14px">
              {{item.dfk<10000?item.dfk:item.dfk<100000000?(item.dfk/10000).toFixed(2):(item.dfk/100000000).toFixed(2)}} </span>{{item.dfk <10000?'元':item.dfk<100000000?'万元':'亿'}}
            </span>
          </p>
        </section>

      </div>
    </section>
    <section class="xxts-pannel_wtfbqk">
      <h5>问题分布情况</h5>
      <div flex spacearound class="pannel_wtfbqk-type">
        <!-- <barChart :barData="barXmdata"></barChart> -->
        <!-- <barChart :barIndex="1" :barTitle="'问题分类'" :barData="barWtdata"></barChart> -->
        <circleChart :circledata="circledata" :circleinnerdata="circleinnerdata"></circleChart>
      </div>

      <div flex spacearound class="pannel_wtfbqk-type" >  
        <section class="wtfbqk-detail" flex-column>
          <p col="1">
            <span class="font17">改进学校环境</span>&#x3000;&#x3000;
            <span>问题个数/占比:
              <span class="fontRed">{{detailData.w02}} / {{detailData.w02zb}}</span>
            </span> &#x3000;工时:
            <span class="fontRed">{{!detailData.w02gs?0:detailData.w02gs}}</span>(小时)</p>
          <div col="5" flex-column spacearound>
            <p>
              <span>改进学校服务器环境</span>
              <span>
                <span title="查看详情" class="fontRed active"  @click="handleCheckDetail('wtbq','50')">{{!detailData.bq50?0:detailData.bq50}}</span> 个
              </span>
            </p>
            <p>
              <span>改进学校数据库环境</span>
              <span>
                 <span title="查看详情" class="fontRed active"  @click="handleCheckDetail('wtbq','51')">{{!detailData.bq51?0:detailData.bq51}}</span> 个
               </span>
              </p>
            <p>
              <span>改进学校网络环境</span>
              <span>
                 <span title="查看详情" class="fontRed active"  @click="handleCheckDetail('wtbq','52')">{{!detailData.bq52?0:detailData.bq52}}</span> 个
              </span>
              </p>
            <p>
              <span>改进学校中间件环境</span>
              <span>
                <span title="查看详情" class="fontRed active"  @click="handleCheckDetail('wtbq','53')">{{!detailData.bq53?0:detailData.bq53}}</span> 个
              </span>
            </p>
            <p>
              <span>物理资源不足</span>
              <span>
                <span title="查看详情" class="fontRed active"  @click="handleCheckDetail('wtbq','54')">{{!detailData.bq54?0:detailData.bq54}}</span> 个
              </span>
            </p>
            <p>
              <span>断电</span>
              <span>
                <span title="查看详情" class="fontRed active"  @click="handleCheckDetail('wtbq','55')">{{!detailData.bq55?0:detailData.bq55}}</span> 个
              </span>
            </p>
            <p>
              <span>未购买服务</span>
              <span>
                <span title="查看详情" class="fontRed active"  @click="handleCheckDetail('wtbq','56')">{{!detailData.bq56?0:detailData.bq56}}</span> 个
              </span>
            </p>
						<p>
						  <span>备件更换</span>
						  <span>
						    <span title="查看详情" class="fontRed active"  @click="handleCheckDetail('wtbq','57')">{{!detailData.bq57?0:detailData.bq57}}</span> 个
						  </span>
						</p>
						<p>
						  <span>第三方应用导致</span>
						  <span>
						    <span title="查看详情" class="fontRed active"  @click="handleCheckDetail('wtbq','58')">{{!detailData.bq58?0:detailData.bq58}}</span> 个
						  </span>
						</p>
          </div>
        </section>
        <section class="wtfbqk-pie">
          <pieChart :piedata="gjxxhjData" :pieIndex="0"></pieChart>
        </section>
      </div>

      <div flex spacearound class="pannel_wtfbqk-type" >  
        <section class="wtfbqk-detail" flex-column>
          <p col="1">
            <span class="font17">加强学校培训</span>&#x3000;&#x3000;
            <span>问题个数/占比:
              <span class="fontRed">{{detailData.w04}} / {{detailData.w04zb}}</span>
            </span> &#x3000;工时:
            <span class="fontRed">{{!detailData.w04gs?0:detailData.w04gs}}</span>(小时)</p>
          <div col="5" flex-column spacearound>
            <p>
              <span>开权限</span>
              <span>
                <span title="查看详情" class="fontRed active" @click="handleCheckDetail('wtbq','62')">{{!detailData.bq62?0:detailData.bq62}}</span> 个
              </span>
            </p>
            <p>
              <span>导数据</span>
              <span>
                 <span title="查看详情" class="fontRed active" @click="handleCheckDetail('wtbq','61')">{{!detailData.bq61?0:detailData.bq61}}</span> 个
               </span>
              </p>
            <p>
              <span>加强培训</span>
              <span>
                 <span title="查看详情" class="fontRed active" @click="handleCheckDetail('wtbq','63')">{{!detailData.bq63?0:detailData.bq63}}</span> 个
              </span>
              </p>
            <p>
              <span>数据库账户权限管理不规范</span>
              <span>
                 <span title="查看详情" class="fontRed active" @click="handleCheckDetail('wtbq','64')">{{!detailData.bq64?0:detailData.bq64}}</span> 个
              </span>
              </p>
            <p>
              <span>用户误删数据</span>
              <span>
                 <span title="查看详情" class="fontRed active" @click="handleCheckDetail('wtbq','65')">{{!detailData.bq65?0:detailData.bq65}}</span> 个
              </span>
              </p>
          </div>
        </section>
        <section class="wtfbqk-pie">
          <pieChart :piedata="jqxxpxData" :pieIndex="1"></pieChart>
        </section>
      </div>

      <div flex spacearound class="pannel_wtfbqk-type" >  
        <section class="wtfbqk-detail" flex-column>
          <p col="1">
            <span class="font17">纳入产品改进</span>&#x3000;&#x3000;
            <span>问题个数/占比:
              <span class="fontRed">{{detailData.w05}} / {{detailData.w05zb}}</span>
            </span> &#x3000;工时:
            <span class="fontRed">{{detailData.w05gs}}</span>(小时)</p>
          <div col="5" flex-column spacearound>
             <p>
              <span>产品bug修复</span>
              <span>
                <span class="fontRed">{{detailData.bq11}}</span> 个
              </span>
            </p>
            <p>
              <span>改进前端组件</span>
              <span>
                 <span class="fontRed">{{!detailData.bq12?0:detailData.bq12}}</span> 个
               </span>
              </p>
            <p>
              <span>异常数据处理</span>
              <span>
                 <span class="fontRed">{{!detailData.bq6?0:detailData.bq6}}</span> 个
              </span>
              </p>
            <p>
              <span>自助硬件问题</span>
              <span>
                <span class="fontRed">{{!detailData.bq16?0:detailData.bq16}}</span> 个
              </span>
              </p>
            <p>
              <span>纳入产品改进</span>
              <span>
                <span class="fontRed">{{!detailData.bq15?0:detailData.bq15}}</span> 个
              </span>
              </p>
            <p>
              <span>改进报表组件</span>
              <span>
                <span class="fontRed">{{!detailData.bq13?0:detailData.bq13}}</span> 个
              </span>
            </p>
            <p>
              <span>缓存问题</span>
              <span>
                <span class="fontRed">{{!detailData.bq18?0:detailData.bq18}}</span> 个
              </span>
            </p>
            <p>
              <span>浏览器兼容问题</span>
              <span>
                <span class="fontRed">{{!detailData.bq17?0:detailData.bq17}}</span> 个
              </span>
            </p>
						<p>
						  <span>帮用户改数据</span>
						  <span>
						    <span class="fontRed">{{!detailData.bq20?0:detailData.bq20}}</span> 个
						  </span>
						</p>
          </div>
        </section>
        <section class="wtfbqk-pie">
          <pieChart :piedata="nrcpgjData" :pieIndex="2"></pieChart>
        </section>
      </div>

      <div flex spacearound class="pannel_wtfbqk-type" >  
        <section class="wtfbqk-detail" flex-column>
          <p col="1">
            <span class="font17">项目分类统计</span>&#x3000;&#x3000;
           </p>
          <div col="5" flex-column spacearound >
            <p >
              <span>在建阶段</span>
              <span>
                个数 / 占比：<span title="查看详情" @click="handleCheckXmDetail('zj')" class="active fontRed" >{{detailData.zjxmwt}} / {{detailData.zjxmwtzb}}</span>&#x3000;<span class="fontRed">{{detailData.zjxmwtgs}}</span> 小时
                 </span>
              </p>
            <p >
              <span>售后阶段</span>
              <span>
                 个数 / 占比：<span title="查看详情" @click="handleCheckXmDetail('sh')" class="active fontRed" >{{detailData.shxmwt}} / {{detailData.shxmwtzb}}</span>个 &#x3000;<span class="fontRed">{{detailData.shxmwtgs}}</span> 小时
             </span>
            </p>
             
            <p >
              <span>过保阶段</span>
              <span>
                 个数 / 占比：<span title="查看详情" @click="handleCheckXmDetail('gb')" class="active fontRed">{{detailData.gbxmwt}} / {{detailData.gbxmwtzb}}</span>个 &#x3000;<span class="fontRed">{{detailData.gbxmwtgs}}</span> 小时
              </span>
            </p>
          </div>
        </section>
        <section class="wtfbqk-pie">
          <pieChart :piedata="xmfltjData" :pieIndex="3"></pieChart>
        </section>
      </div>
      
       <div flex spacearound class="pannel_wtfbqk-type" >  
        <section class="wtfbqk-detail">
          <p col="1">
            <span class="font17">产品个性化需求</span>&#x3000;&#x3000;
            <span>问题个数/占比:
              <span class="fontRed">{{detailData.w01}} / {{detailData.w01zb}}</span>
            </span> &#x3000;工时:
            <span class="fontRed">{{detailData.w01gs}}</span>(小时)
          </p>
          <div col="5" flex-column spacearound>
            <p>
              <span>个性化需求定制</span>
              <span>
                <span class="fontRed">{{!detailData.bq21?0:detailData.bq21}}</span> 个
              </span>
            </p>
          </div>
        </section>
        <section class="wtfbqk-pie"></section>
      </div>

    </section>
  </div>
</template>

<script>
import circleChart from "@/components/chart/circleChart.vue";
import barChart from "@/components/chart/barChart.vue";
import pieChart from "@/components/chart/pieChart.vue";

export default {
  data() {
    return {
      dwmc: "",
      detailData: {},
      sortList: [
        { mc: "项目数", value: 0  ,type:'xms'},
        { mcyfk: "已付款", yfk: 0 ,mcdfk: "待付款", dfk: 0 ,type:'fk'},
        { mc: "问题数", value: 0 ,type:'wtzs'},
        { mc: "总工时", value: 0 },
        { mc: "延期任务", value: 0 ,type:'yq'}
      ],
      fkData:{},//欠款 带欠款
      gjhjData: [
        { value: 0, name: "服务器环境" },
        { value: 0, name: "数据库环境" },
        { value: 0, name: "网络环境" },
        { value: 0, name: "中间件环境" }
      ], //改进学校环境饼图数据
      
      gjxxhjData:[],//改进学校环境
      jqxxpxData:[],//加强学校培训
      nrcpgjData:[],//纳入产品改进
      xmfltjData:[],//项目分类
      circledata:[],
      circleinnerdata:[],
      barData:[],
      barXmdata:[],
      barWtdata:[]
    };
  },
  methods: {
    handleCheckDetail(key, value, params, type) {
      if(!key) return;
      if(key == 'yq' || key == 'xms'|| key == 'fk'){
        let { href } = this.$router.resolve({
          path: "/xxtsqlDetail",
          query:{lx:key,dwmc:this.dwmc}
        });
        window.open(href, "_blank");
        return;
      }
      let obj = {};
      obj["dwmc"] = !this.detailData.dw?this.dwmc:this.detailData.dw;
      if (!!params) {
        obj["xmbh"] = params.xmbh;
        obj["wtxmlx"] = type == "gb" ? 3 : type == "sh" ? 2 : 1;
      }
      obj[key] = value;
      let { href } = this.$router.resolve({
        path: "/questionport",
        query: {
					bh:this.detailData.dwbh
				}
      });
      window.open(href, "_blank");
    },
    
    // 查看项目明细
    handleCheckXmDetail(data){
      this.$router.push({path:'/xxtsqlDetail',query:{lx:data,dwmc:this.dwmc}})
    },
    // 明细
    dwtsqlmxReport() {
      this.$get(this.API.dwtsqlmxReport, {
        dwmc: this.dwmc
      }).then(res => {
        if (res.state == "success") {
          this.detailData = res.data;
          this.sortList[0].value = !res.data.wtzs?0:res.data.xmzs;
          this.sortList[1].yfk = !res.data.yfk?0:res.data.yfk;
          this.sortList[1].dfk = !res.data.dfk?0:res.data.dfk;

          this.sortList[2].value = !res.data.wtzs?0:res.data.wtzs;
          this.sortList[3].value = !res.data.hjgs?0:res.data.hjgs;
          this.sortList[4].value = !res.data.yqrws?0:res.data.yqrws;
      

          // 改进环境组件
          this.gjxxhjData = [
            {value:res.data.bq50,name:'服务器环境'},
            {value:res.data.bq51,name:'数据库环境'},
            {value:res.data.bq52,name:'网络环境'},
            {value:res.data.bq53,name:'中间件环境'}
          ];
          // 加强学校培训
          this.jqxxpxData = [
            {value:res.data.bq62,name:'开权限'},
            {value:res.data.bq61,name:'导数据'},
            {value:res.data.bq63,name:'加强培训'},
          ];
          // 纳入产品改进
          this.nrcpgjData = [
            {value:res.data.bq11,name:'产品bug修复'},
            {value:res.data.bq12,name:'改进前端组件'},
            {value:res.data.bq6,name:'异常数据处理'},
            {value:res.data.bq16,name:'自助硬件问题'},
            {value:res.data.bq15,name:'纳入产品改进'},
            {value:res.data.bq13,name:'改进报表组件'},
          ];
          //项目分类统计
          this.xmfltjData = [
            {value:res.data.zjxmwt,name:'在建阶段'},
            {value:res.data.shxmwt,name:'售后阶段'},
            {value:res.data.gbxmwt,name:'过保阶段'},
          ];
          // 总计
          this.circledata = [
            {value:res.data.w01,name:'产品个性化需求'},
            {value:res.data.w02,name:'改进学校环境'},
            {value:res.data.w04,name:'加强学校培训'},
            {value:res.data.w05,name:'纳入产品改进计划'},
          ];
           
          this.circleinnerdata = [
            {value:!res.data.zjxmwt?0:res.data.zjxmwt,name:'在建'},
            {value:!res.data.shxmwt?0:res.data.shxmwt,name:'售后'},
            {value:!res.data.gbxmwt?0:res.data.gbxmwt,name:'过保'},
          ];
          
          this.barXmdata = [
            {value:res.data.zjxmwt,name:'在建阶段'},
            {value:res.data.shxmwt,name:'售后阶段'},
            {value:res.data.gbxmwt,name:'过保阶段'},
          ];

          this.barWtdata = [
            {value:res.data.w02,name:'改进学校环境'},
            {value:res.data.w04,name:'加强学校培训'},
            {value:res.data.w05,name:'纳入产品改进'},
            {value:res.data.w01,name:'产品个性化需求'},
          ]

        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },
    // 过保
    pageGbWtxm() {
      this.$get(this.API.pageGbWtxm, {
        curPage: this.gbPage,
        pageSize: this.gbPageSize,
        dwmc: this.dwmc
      }).then(res => {
        if (res.state == "success") {
          this.gbData = res.data.rows;
          this.gbTotal = res.data.records;
        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },
    // 售后
    pageShWtxm() {
      this.$get(this.API.pageShWtxm, {
        curPage: this.shPage,
        pageSize: this.shPageSize,
        dwmc: this.dwmc
      }).then(res => {
        if (res.state == "success") {
          this.shData = res.data.rows;
          this.shTotal = res.data.records;
        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },
    // 在建
    pageZjWtxm() {
      this.$get(this.API.pageZjWtxm, {
        curPage: this.zjPage,
        pageSize: this.zjPageSize,
        dwmc: this.dwmc
      }).then(res => {
        if (res.state == "success") {
          this.zjData = res.data.rows;
          this.zjTotal = res.data.records;
        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },
    // 延期任务
    pageYqRwxm() {
      this.$get(this.API.pageYqRwxm, {
        curPage: this.yqPage,
        pageSize: this.yqPageSize,
        dwmc: this.dwmc
      }).then(res => {
        if (res.state == "success") {
          this.yqData = res.data.rows;
          this.yqTotal = res.data.records;
        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    }
  },
  mounted() {
    if (!!this.$route.query.dwmc) {
      this.dwmc = unescape(this.$route.query.dwmc);
    } else {
      this.dwmc = JSON.parse(sessionStorage.userInfo).unit;
    }
    this.dwtsqlmxReport();
    // this.pageGbWtxm(); //过保
    // this.pageShWtxm(); //售后
    // this.pageZjWtxm(); //在建
    // this.pageYqRwxm(); //延期
  },
  components: { circleChart, barChart, pieChart }
};
</script>

<style lang='scss' scoped>
.xxts-pannel {
  width: 90%;
  margin: 15px auto;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  h4 {
    font-size: 25px !important;
    font-weight: 700;
    text-align: center;
    margin-bottom: 20px !important;
  }
  .xxts-pannel_sort {
    .sort_circle {
      width: 10vw;
      height: 10vw;
      border-radius: 50%;
      font-size: 22px;
      box-shadow: -5px -5px 15px rgb(190, 190, 190);
      font-size: 15px;
      .nums {
        font-size: 22px;
        color: #f00;
      }
    }
    .active-hover{
      &:hover{
        cursor: pointer;
        color: #12468a;
      }
    }
  }
  h5 {
    font-size: 16px !important;
    font-weight: 700;
    margin: 20px 0 !important;
    color: #999999;
    border-left: 4px solid rgb(141, 75, 158);
    padding-left: 10px;
  }
  .xxts-pannel_wtfbqk {
    .wtfbqk-detail {
      width: 42%;
      font-weight: 700;
      > p {
        font-size: 15px !important;
        color: rgb(179, 116, 34);
        .font17 {
          font-size: 17px;
        }
      }
      div {
        text-align: center;
        padding: 15px 0;
        font-size: 14px;
        color: rgb(179, 116, 34);
        p{
            >span {
            display: inline-block;
            width: 150px;
          }
            >span:nth-child(2) {
              white-space: nowrap;
            display: inline-block;
            width: 100px;
          }
        }
      }
      .fontRed {
        color: #f00;
      }
      .active{
        text-decoration: underline;
        &:hover{
          color: #12468a;
          cursor: pointer;
        }
      }
    }
    .wtfbqk-pie {
      width: 53%;
    }

    .pannel_wtfbqk-type {
      margin: 20px 0;
      padding: 20px 0;
      border-radius: 10px;
      box-shadow: 0 0 5px rgba(104, 114, 114, 0.2);
    }
  }
}
.circle_xms {
  border: 2px solid rgb(168, 190, 218);
  background: rgba(189, 210, 236, 0.3);
}
.circle_wts {
  border: 2px solid #f5dac3;
  background: rgba(245, 218, 195, 0.3);
}
.circle_zgs {
  border: 2px solid #fae492;
  background: rgba(250, 228, 146, 0.3);
}
.circle_yqs {
  border: 2px solid #98c070;
  background: rgba(152, 192, 112, 0.3);
}
.circle_fk{
  border: 2px solid #bba49f;
  background: rgba(180, 79, 54, 0.3)
}
</style>
