<template>
    <div>
		<!-- :max-height="tableHeight" -->
        <el-table :data="tableData" border style="width: 100%" >
            <el-table-column
                fixed="left"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.zt != '待生成'" type="text" size="small" @click="handleRestarItem(scope.row,scope.$index)">{{scope.row.flag==1?'停滞':'重启'}}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="yh" label="学校名称" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column  label="项目名称" min-width="240" show-overflow-tooltip>
                <template slot-scope="scope">
                    <a href="javaScript:;;" @click="handleCheckDetail(scope.row.xmbh)">{{scope.row.xmmc}}</a>
                </template>
            </el-table-column>
            <el-table-column prop="xmbh" label="项目编号" width="140"></el-table-column>
            <el-table-column prop="htbh" label="合同编号" width="140"></el-table-column>
            <el-table-column prop="xmlb" label="项目类别" width="110"></el-table-column>
            <el-table-column  label="状态" width="100">
                <template slot-scope="scope">
                    <el-tag size="mini"  :type="scope.row.flag == 1 ? 'success' : 'danger'">{{scope.row.flag==1?'已重启':'已停滞'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column  label="状态" width="100">
                <template slot-scope="scope">
                    <el-tag size="mini"  :type="scope.row.zt === '已发布' ? 'success' : 'primary'">{{scope.row.zt}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="sfgx" label="是否购销" width="80" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sfzt" label="合同性质" width="80" show-overflow-tooltip></el-table-column>
            <el-table-column prop="dkl" label="到款率" width="80" show-overflow-tooltip></el-table-column>
            <el-table-column prop="fwqx" label="服务期限" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="lxrq" label="立项日期" width="140" show-overflow-tooltip></el-table-column>
        </el-table>
        </el-table>
    </div>
</template>

<script>
export default {
  data() {
    return {
      tableHeight: window.innerHeight - 230
    };
  },
  methods: {
    handleCheckDetail(data) {
      let routeData = this.$router.resolve({
        path: "/zdsfw",
        query: { xmbh: data }
      });
      window.open(routeData.href, "_blank");
    },


    handleRestarItem(params,index){
        this.$confirm(params.flag==1?'是否停滞此项目？':'是否重启此项目？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.$post(this.API.updateActiveServiceFlag,{
            xmbh:params.xmbh,
            flag:params.flag==1?0:1
           }).then(res=>{
                if(res.state == 'success'){
                    this.$message({message:'保存成功',type:'success'});
                    this.$emit('handleRestar',params.flag==1?0:1,index);
                }else{

                }
          })
        }).catch(() => {
             
        });
      
    }
  },
  props: {
    tableData: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  components: {}
};
</script>

<style scoped>
</style>
