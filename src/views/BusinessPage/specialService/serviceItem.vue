<template>
  <div>
    <div class="layout-bgf">
      <el-card shadow="hover">
        <div>
          <div>
            <span class="query-title">高级查询</span>
            <el-input
              v-model="filterData.keyword"
              style="width:493px;"
              size="mini"
              placeholder="请输入问题提出人姓名/工号/手机号/标题/项目编号/项目名称/学校名称"
              @change="handleQuery"
            ></el-input>&#x3000;
            <el-button type="primary" size="mini" @click="handleQuery">查询</el-button>
          </div>

          <div class="mg-12">
            <p class="query-title">状态:</p>
            <p class="query-list">
              <span
                v-for="(zt, index) in ztList"
                @click="handleChangezt(zt.label)"
                :key="index"
                :class="{ 'bg-active': filterData.zt == zt.label }"
              >{{ zt.mc }}</span>
            </p>
          </div>
        </div>
      </el-card>
    </div>
    <div class="layout-bgf">
      <el-card shadow="hover" style="padding:0 20px">
        <div class="mb-12">
          <el-button type="primary" size="small" @click="handleAddItem">添加项目</el-button>
        </div>
        <el-table :data="tableData" border :max-height="tableHeight">
          <el-table-column prop="qygc" label="学校名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="qyzd" label="项目名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="qyzddzxm" label="项目编号" width="120"></el-table-column>
          <el-table-column prop="sjzgxm" label="合同编号" width="120"></el-table-column>
          <el-table-column prop="sjzgxm" label="项目类别" width="120"></el-table-column>
          <el-table-column prop="sjzgxm" label="服务生成状态" width="120"></el-table-column>
          <el-table-column prop="sjzgxm" label="服务期限" width="100"></el-table-column>
          <el-table-column prop="cgcp" label="采购产品" width="100"></el-table-column>
          <el-table-column prop="cgcp" label="立项日期" width="120"></el-table-column>
        </el-table>
        <div text-right class="pd-10">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[15, 30, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </el-card>
    </div>

    <el-dialog title="选择项目" :visible.sync="chooseItemShow" :close-on-click-modal="false" width="800px" top="30px"
		 append-to-body>
			<div style="padding:10px;">
				<itemChoose @handleEdit="handleChooseItem"></itemChoose>
			</div>
	</el-dialog>
  </div>
</template>

<script>
import itemChoose from "@/components/BusinessPage/itemChoose.vue";
export default {
  data() {
    return {
      chooseItemShow:false,
      filterList: ["keyword"],
      tableHeight: window.innerHeight - 300,
      currentPage: 1,
      pageSize: 15,
      total: 0,
      filterData:{
        zt:'',
        keyword:''
      },
      ztList:[{mc:'全部',label:''},{mc:'待生成',label:'0'},{mc:'待发布',label:'1'},{mc:'已发布',label:'2'}],
      tableData: []
    };
  },
  mounted() {},
  methods: {
    handleCurrentChange(data) {
      this.currentPage = data;
    },
    handleSizeChange(data) {
      this.pageSize = data;
      this.currentPage = 1;
    }, 
    //添加 战队
    handleAddItem() {
      this.chooseItemShow = !this.chooseItemShow;
    },
    handleChooseItem(data){
      console.log(data);
      this.chooseItemShow = !this.chooseItemShow;
    },
    // 状态 筛选
    handleChangezt(){

    },
    // 高级搜索
    handleQuery(data) {
    
    },

  },
  components: {itemChoose}
};
</script>

<style scoped>
.layout-bgf {
  width: 95%;
  margin: 10px auto;
}
</style>
