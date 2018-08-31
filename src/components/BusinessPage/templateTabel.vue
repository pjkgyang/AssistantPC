  <template>
  <div style="padding:20px; 0" >
    <div class="template-page">
  <el-select v-model="value" placeholder="请选择" size="mini" style="width:200px;margin:10px 0"  @change="handleSelect"> 
    <el-option
      v-for="(template,index) in TemplateCp"
      :key="index"
      :label="template.cpmc_display"
      :value="template.cpdm">
    </el-option>
  </el-select>

    <el-table
      :data="tableData"
      style="width: 100%"
      :max-height="tableHeight"
      border>
      <el-table-column  prop="parentName"  label="里程碑" width="300"> </el-table-column>
      <el-table-column  label="文档材料"> 
      <template slot-scope="scope">
        <div slot="reference" class="name-wrapper">
          <a :href="baseUrl+'attachment/downloadTemplateFile.do?path='+scope.row.mblj"><span class="el-icon-download"></span>{{scope.row.wdmc}}</a>
         </div>
      </template>
      </el-table-column>
      <!-- <el-table-column  prop="sfxyqz" label="是否需要签字" width="120"> </el-table-column>
      <el-table-column  prop="qzgz" label="签字盖章"> </el-table-column>
      <el-table-column  prop="sfbx" label="是否必须" width="100"> </el-table-column>
      <el-table-column  prop="scml" label="上传目录"> </el-table-column>
      <el-table-column  prop="bz" label="备注"> </el-table-column> -->
    </el-table>
    </div>
    </div>
  </template>

  <script>
import {
  getTemplates,
  getTemplateCp,
  downloadLocalFile
} from "@/api/TaskProcess.js";
export default {
  data() {
    return {
      tableHeight:window.innerHeight - 200,
      tableData: [],
      baseUrl: "",
      activeName: "first",
      value: "",
      TemplateCp: []
    };
  },
  methods: {
    // 切换模板
    handleSelect(data) {
      this.getTemplates(data);
    },

    // 获取所有模板
    getTemplates(value) {
      getTemplates({
        cpdm: value
      }).then(({ data }) => {
        if (data.state == "success") {
          this.tableData = data.data;
        }
      });
    }
  },
  mounted() {
    this.baseUrl = window.baseurl;
    getTemplateCp().then(({ data }) => {
      if (data.state == "success") {
        this.TemplateCp = data.data;
        this.value = data.data[0].cpdm;
        this.getTemplates(this.value);
      } else {
        this.getTemplates();
      }
    });
  }
};
</script>
  <style scoped>
.downloadFile:hover {
  cursor: pointer;
}
.template-page {
  box-shadow:0 2px 12px 0 rgba(0,0,0,.1);
  background: #fff;
  border-radius: 5px;
  padding: 10px;
}
</style>
  