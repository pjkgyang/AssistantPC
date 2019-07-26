<template>
	<div class="pannelPadding-10">
		<div class="pannelPaddingBg-10">
			<div>
          <chooseSchool @handleChangeUnit="handleChangeUnit"></chooseSchool>
				<div class="mg-12">
					<span class="filter-weight" >建设年份:</span>
					<el-date-picker size="mini" v-model="qsnf" align="right" type="year" placeholder="选择开始年">
					</el-date-picker> 到
					<el-date-picker size="mini" v-model="jsnf" align="right" type="year" placeholder="选择结束年">
					</el-date-picker>

					<el-button size="mini" type="primary" @click="handleSearch">查询</el-button>
				</div>
			</div>
			<div class="pd-10">
        <tree-table
				ref="recTree"
        :isAna="true"
				:list.sync="tableData"
				@handlerExpand="handlerExpand"
        @handleRouter="handleRouter"
			></tree-table>
				<!-- <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="mc" label="部门" min-width="200"></el-table-column>
					<el-table-column prop="yfwzn" label="有服务指南">
            <template slot-scope="scope">
              <a :href="'#/schoolseivice/serviceStatistic?id='+scope.row.wid+'&bh='+unitData.dwbh+'&s='+qsnf+'&e='+jsnf+'&fwzn=1'" target="_blank">{{scope.row.yfwzn}}</a>
            </template>
          </el-table-column>
					<el-table-column prop="wfwzn" label="无服务指南" >
            <template slot-scope="scope">
              <a :href="'#/schoolseivice/serviceStatistic?id='+scope.row.wid+'&bh='+unitData.dwbh+'&s='+qsnf+'&e='+jsnf+'&fwzn=0'">{{scope.row.wfwzn}}</a>
            </template>
          </el-table-column>
					<el-table-column prop="yxxhzc" label="有信息化支持">
            <template slot-scope="scope">
              <a :href="'#/schoolseivice/serviceStatistic?id='+scope.row.wid+'&bh='+unitData.dwbh+'&s='+qsnf+'&e='+jsnf+'&xxh=1'">{{scope.row.yxxhzc}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="wxxhzc" label="无信息化支持">
            <template slot-scope="scope">
              <a :href="'#/schoolseivice/serviceStatistic?id='+scope.row.wid+'&bh='+unitData.dwbh+'&s='+qsnf+'&e='+jsnf+'&xxh=0'">{{scope.row.wxxhzc}}</a>
            </template>
          </el-table-column>
          <el-table-column  label="好评占比">
            <template slot-scope="scope">
              <span>{{scope.row.hpzb?scope.row.hpzb:'-'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="xxhfgl" label="信息化覆盖率">
            <template slot-scope="scope">
               <a href="#">{{scope.row.xxhfgl}}</a>
            </template>
          </el-table-column>
				</el-table> -->
			</div>
		</div>
	</div>
</template>

<script>
  import chooseSchool from '@/components/BusinessPage/chooseSchool.vue';
  import treeTable from "@/components/treeTable/tree-table.vue";
  export default {
	data() {
		return {
			qsnf:'',
			jsnf:'',
      unitData:{},
			tableData: []
		};
	},
	methods: {
    handleRouter(m,type){
      let query = {
          id:m.id,
          bh:this.unitData.dwbh,
          s:this.qsnf,
          e:this.jsnf
        };
        if(type == 'yfwzn'){
          query.ffzn = 1;
        }else if(type == 'wfwzn'){
          query.ffzn = 0;
        }else if(type == 'yxxhzc'){
          query.xxhzc = 1;
        }else if(type == 'wxxhzc'){
          query.xxhzc = 0;
        }
   
      let routeData = this.$router.resolve({
        path: "/schoolseivice/serviceStatistic",
        query:query
      });
      window.open(routeData.href, "_blank");
      
    },
    handlerExpand(m) {
      m.isExpand = !m.isExpand;
    },
		handleSearch() {
      this.serviceItemStat();
    },

    handleChangeUnit(prams){
    	this.unitData = prams;
    	this.serviceItemStat();
    },
    // 服务事项分析
    serviceItemStat(){
      this.$get(this.API.serviceItemStat,{
        dwbh:this.unitData.dwbh,
        dwmc:this.unitData.dwmc,
        jsnfStart:this.qsnf,
        jsnfEnd:this.jsnf
      }).then(res=>{
        if(res.state == 'success'){
          if(!res.data){
            this.tableData = [];
          }else{
            this.tableData = res.data;
          }
        }else{

        }
      })
    }
	},
  components: {
    chooseSchool,
    treeTable
  },
};
</script>

<style>


</style>
