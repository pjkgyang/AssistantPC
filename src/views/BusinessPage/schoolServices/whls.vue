<template>
	<div class="fwsxtj-pannel">
		<div class="pannelPaddingBg-10">
			<div class="mg-12"><chooseSchool @handleChangeUnit="handleChangeUnit"></chooseSchool></div>
			<div>
				<div class="mg-12"><el-input style="width:365px" v-model="keyword" size="mini" placeholder="请输入用户姓名查询" @change="handleSearch"></el-input></div>
				<el-table :data="tableData" border style="width: 100%" :max-height="tableHeight">
					<el-table-column prop="username" label="姓名"></el-table-column>
					<el-table-column prop="dept" label="部门"></el-table-column>
					<el-table-column prop="email" label="邮箱"></el-table-column>
					<el-table-column fixed="right" label="操作" width="150">
						<template slot-scope="scope">
							<el-button type="text" size="small" @click="handleEditDept(scope.row)">编辑</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination
					@current-change="handleCurrentChange"
					:current-page.sync="currentPage"
					:page-size="pageSize"
					layout="total, prev, pager, next"
					:total="records"
				></el-pagination>
			</div>
		</div>
		
		<el-dialog
		  title="部门维护"
		  :visible.sync="dialogVisible"
		  width="800px"
		  >
		  <div class="pd-10">
			  <el-tree
			    :data="treeDataSource"
			    show-checkbox
			    node-key="id"
			    ref="tree"
			    :props="defaultProps"
			    :default-expanded-keys="openIds"
			    :default-checked-keys="checkedIds">
			  </el-tree>
			  <div slot="footer" class="dialog-footer" text-right>
				   <el-button size="mini" type="primary" @click="handleCommit">确 定</el-button>
			  		<el-button size="mini" @click="dialogVisible = false">取 消</el-button>
			  </div>
		  </div>
		</el-dialog>

		
	</div>
</template>

<script>
import chooseSchool from '@/components/BusinessPage/chooseSchool.vue';
import VueTree from 'vue-simple-tree/src/components/VueTree.vue';
export default {
	data() {
		return {
			tableHeight:window.innerHeight - 220,
			dialogVisible:false,
			unitData: {},
			keyword: '',
			tableData: [],
			currentPage: 1,
			pageSize: 15,
			records: 0,
			checkIds:[],
			checkedIds:[],
			openIds:[],
			defaultProps: {
			  children: 'children',
			  label: 'title'
			},
			treeDataSource: []
		};
	},
	mounted(){
		// this.$refs.tree.setCheckedKeys(['2','5','4'],true);
	},
	methods: {
		handleCommit(){
			
			let keys =  this.$refs.tree.getCheckedKeys();
			let halfKeys =  this.$refs.tree.getHalfCheckedKeys();
			let ids = halfKeys.concat(keys);

			this.$post(this.API.addUserDept,{
				userId:this.curUser.userid,
				deptIds:ids.join(',')
			}).then(res=>{
				if(res.state == 'success'){
					this.$message({
						message:'保存成功',
						type:'success'
					})
					this.dialogVisible = false;
				}else{
					this.$message({message:res.msg,type:'error'})
				}
			})
		},
		handleEditDept(params) {
			this.curUser = params;
			this.openIds = [];
			this.checkedIds = [];
			this.userDeptChecked();
			this.treeDept();
			this.dialogVisible = true;
		},
		
		//递归删除一级父节点
		filterTree(treeData){
			treeData.forEach((ele,i,arr)=>{
					if(!!ele.children  && !!ele.children.length ){
						if(!!ele.isExpand && !this.checkIds.length){
							this.openIds.push(ele.id);
						}
						this.checkIds.forEach((element,_i,array)=>{
							if(element == ele.id){
								this.openIds.push(ele.id);
								this.checkIds.splice(_i,1);
								this.checkedIds = this.checkIds;
							}
						})
						this.filterTree(ele.children);
				  }
			})
		},

		handleSearch() {
			this.currentPage = 1;
			this.getSchoolUsers();
		},
		handleChangeUnit(prams) {
			this.unitData = prams;
			this.currentPage = 1;
			this.getSchoolUsers();
		},
		handleCurrentChange(data) {
			this.currentPage = data;
			this.getSchoolUsers();
		},
		getSchoolUsers() {
			this.$get(this.API.getUsers, {
				curPage: this.currentPage,
				pageSize: this.pageSize,
				dwbh: this.unitData.dwbh,
				unitType: 1,
				keyword: this.keyword
			}).then(res => {
				if (res.state == 'success') {
					if (!!res.data.rows) {
						this.tableData = res.data.rows;
					} else {
						this.tableData = [];
					}
					this.records = res.data.records;
				} else {
					this.$message({message:res.msg,type:'error'})
				}
			});
		},
		treeDept(){
			this.$get(this.API.treeDeptWithUnit,{
				dwbh:this.unitData.dwbh,
				dwmc:this.unitData.dwmc,
				zts:'1,3'
			}).then(res=>{
				if(res.state == 'success'){
					this.treeDataSource = res.data;
					this.filterTree(this.treeDataSource);
				}
			})
		},
		// 获取用户已关联部门编号
		userDeptChecked(){
			this.$get(this.API.userDeptChecked,{
				userId:this.curUser.userid
			}).then(res=>{
				if(res.state == 'success'){
					this.checkIds = !res.data?[]:res.data;
				}else{
					this.$message({message:res.msg,type:'error'})
				}
			})
		}
	},
	components: {
		chooseSchool,
		VueTree
	}
};
</script>

<style>
.fwsxtj-pannel {
	margin: 20px 50px 0;
}
</style>
