<template>
	<div  colcenter>
		<span class="filter-weight">选择学校：</span>
		<el-select v-model="schoolNames" filterable remote :clearable="isClear" placeholder="请选择" size="mini" @change="changeUnit" :remote-method="remoteMethod" style="width:300px">
			<el-option v-for="(item, index) in schoolNamesOptions" :key="index" :label="item.mc" :value="item.wid"></el-option>
		</el-select>
	</div>
</template>

<script>
	import { getDwByUser } from "@/api/system.js";
	export default{
		data(){
			return {
				schoolNamesOptions:[],
				schoolNames:'',
				unit:{
					dwbh:'',
					dwmc:''
				}
			}
		},
		props:{
			isClear:{
				type:Boolean,
				default:true
			}
		},
		mounted(){
			this.getDwByUser(true,'');
		},
		methods:{
			// 更换单位
			changeUnit(val){
				if(!!val){
					let obj = {};
					obj = this.schoolNamesOptions.find((item)=>{
						return item.wid === val;
					});
					this.unit.dwbh = obj.wid;
					this.unit.dwmc = obj.mc;
				}else{
					this.unit.dwbh = '';
					this.unit.dwmc = '';
				}
				this.$emit('handleChangeUnit',this.unit);
			},
			remoteMethod(val) {  //远程搜索
			   this.getDwByUser('',val);
			},
			// 更换单位
			getDwByUser(init,keyword){
			    getDwByUser({
			    dwlx: "",
			    curPage: 1,
			    pageSize: 9,
			    keyword:keyword
			    }).then(({ data }) => {
			    if (data.state == "success") {
			          if(data.data.rows){
						  this.schoolNamesOptions = data.data.rows;
						  if(!!init){
							this.schoolNames = this.schoolNamesOptions[0].jc
							this.unit.dwbh = data.data.rows[0].wid;
							this.unit.dwmc = data.data.rows[0].mc;
							this.$emit('handleChangeUnit',this.unit);
						  }
			          }else{
			       
			        }
			      }
			    });
			},
		}
	}
</script>

<style></style>
