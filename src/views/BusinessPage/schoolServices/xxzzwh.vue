<template>
 <div class="pannelPadding-10">
	<div class="menus-tree pannelPaddingBg-10">
		<div>
			<chooseSchool @handleChangeUnit="handleChangeUnit"></chooseSchool>
		</div>
		<br />
		<div>
			<tree-table
				ref="recTree"
				:list.sync="treeDataSource"
				@actionFunc="actionFunc"
				@deleteFunc="deleteFunc"
				@startRejectFunc="startRejectFunc"
				@handlerExpand="handlerExpand"
			></tree-table>
		</div><br>
	</div>


		<el-dialog title="提示" :visible.sync="dialogVisible" width="600px">
			<el-form ref="form" :model="formData" label-width="80px" size="mini" style="padding:12px">

				<el-form-item label="部门名称" required><el-input size="mini" v-model="formData.bmmc"></el-input></el-form-item>
        <el-form-item label="部门编码" required><el-input size="mini" v-model="formData.bmdm"></el-input></el-form-item>
				<el-form-item label="是否展开" required>
					<el-radio-group v-model="formData.sfzk" size="mini">
						<el-radio :label="1">是</el-radio>
						<el-radio :label="0">否</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="排序" required size="mini"><el-input type="number" v-model="formData.sortCode"></el-input></el-form-item>
				<el-form-item text-right>
					<el-button type="primary" @click="handleCommit">保存</el-button>
					<el-button @click="dialogVisible = false">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>
<script>
import treeTable from "@/components/treeTable/tree-table.vue";
import chooseSchool from "@/components/BusinessPage/chooseSchool.vue";
export default {
  data() {
    return {
      dialogVisible: false,
      dwbh: "", //单位编号
      dwmc: "",
      keyword: "",
      formData: {
        bmdm: "",
        bmmc: "",
        sfzk: 1,
        sortCode: ""
      },
      curTreeData: {},
      isEdit: false,
      childData: {},
      treeDataSource: [], //tree
      parentNode: []
    };
  },
  mounted() {},
  components: {
    treeTable,
    chooseSchool
  },
  methods: {
    // 添加下级
    actionFunc(m, type, parentNode) {
      this.curTreeData = m;
      if (type == "add") {
        this.isEdit = false;
        this.dialogVisible = true;
      } else {
        this.parentNode = parentNode; //父节点
        this.isEdit = true;
        this.formData.bmmc = m.title;
        this.formData.sfzk = m.isExpand;
        this.formData.sortCode = m.sortCode;
        this.dialogVisible = true;
      }
    },
    // 删除
    deleteFunc(m) {
      this.$confirm("是否删除该部门?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$post(this.API.deleteDept, {
            wid: m.id
          }).then(res => {
            if (res.state == "success") {
              this.$message({ message: "删除成功~", type: "success" });
              this.treeDept();
            } else {
              this.$message({ message: res.msg, type: "error" });
            }
          });
        })
        .catch(() => {});
    },
    // 启用或禁用
    startRejectFunc(m, type) {
      this.$confirm(
        type == "start" ? "是否启用该部门?" : "是否禁用该部门?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        this.$post(
          type == "start" ? this.API.enableDept : this.API.disableDept,
          {
            wid: m.id
          }
        ).then(res => {
          if (res.state == "success") {
            this.$message({
              message: type == "start" ? "部门已启用~" : "部门已禁用~",
              type: "success"
            });
            this.$set(m, "dataStatus", type == "start" ? 1 : 3);
          } else {
            this.$message({ message: res.msg, type: "error" });
          }
        });
      });
    },

    // 新增下级
    handleCommit() {
      this.$post(this.API.saveDept, {
        wid: !!this.isEdit ? this.curTreeData.id : "",
        dwbh: this.dwbh,
        dwmc: this.dwmc,
        mc: this.formData.bmmc,
        bmdm: this.formData.bmdm,
        parentid: this.curTreeData.id,
        px: this.formData.sortCode,
        sfzk: this.formData.sfzk
      }).then(res => {
        if (res.state == "success") {
          this.$message({ message: "保存成功~", type: "success" });
          if (!!this.isEdit) {
            this.$set(this.curTreeData, "title", this.formData.bmmc);
            this.$set(this.curTreeData, "isExpand", this.formData.sfzk);
            this.$set(this.curTreeData, "sortCode", this.formData.sortCode);
            this.$set(this.curTreeData, "bmdm", this.formData.bmdm);
            this.parentNode.children.sort(function(a, b) {
              return a.sortCode - b.sortCode;
            });
          } else {
            this.treeDept();
          }
          this.formData.bmmc = '';
          this.formData.sfzk = 1;
          this.formData.sortCode = '';
          this.dialogVisible = false;
        } else {
          this.$message({ message: res.msg, type: "error" });
        }
      });
    },
    // 选择单位
    handleChangeUnit(params) {
      this.dwbh = params.dwbh;
      this.dwmc = params.dwmc;
      this.treeDept();
    },
    handlerExpand(m) {
      m.isExpand = !m.isExpand;
    },
    treeDept() {
      this.$get(this.API.treeDeptWithUnit, {
        dwbh: this.dwbh,
        dwmc: this.dwmc,
        zts: "1,3"
      }).then(res => {
        if (res.state == "success") {
          this.treeDataSource = res.data;
        }
      });
    }
    // getTreeData() {
    //   // 取父节点
    //   let parentArr = this.list.filter(l => l.parentId === 0)
    //   this.treeDataSource = this.getTreeData(this.list, parentArr)
    // },
    // // 这里处理没有children结构的数据
    // getTreeData(list, dataArr) {
    //   dataArr.map((pNode, i) => {
    //     let childObj = []
    //     list.map((cNode, j) => {
    //       if (pNode.Id === cNode.parentId) {
    //         childObj.push(cNode)
    //       }
    //     })
    //     pNode.children = childObj
    //     if (childObj.length > 0) {
    //       this.getTreeData(list, childObj)
    //     }
    //   })
    //   return dataArr
    // }
  }
};
</script>

<style>
.menus-tree {
  width: 100%;
  padding: 15px;
  border-radius: 5px;
  background: #fff;
}
.menus-tree h4 {
  font-weight: 700;
  border-bottom: 2px solid #aaa;
  padding: 10px 0;
  margin-bottom: 15px !important;
}
</style>
