<template>
 <div>
      <el-dialog
            title="选择部门"
            width="700px"
            top="30px"
            :visible.sync="visible"
            :append-to-body="true"
            :close-on-click-modal="false"
            @close="$emit('update:show', false)"
            :show="show">
            <div class="dialog-tree">
                <section>
                  <el-input
                    size="mini"
                    placeholder="输入部门名称查询"
                    v-model="filterText">
                  </el-input>
                </section>

                 <section class="tree"> 
                    <el-tree
                    node-key="id"
                    class="filter-tree"
                    :data="treeData"
                    :props="defaultProps"
                    default-expand-all
                    :filter-node-method="filterNode"
                    :render-content="renderContent"
                    ref="tree2">
                  </el-tree>
                </section>
                
                <section text-right>
                    <el-button size="small" @click="visible = false">取消</el-button>
                </section>
            </div>
        </el-dialog>
 </div>
</template>

<script>
 export default {
   data () {
     return {
         visible:this.show,
         treeData:[],
         filterText:"",
         defaultProps: {
            children: 'children',
            label: 'title'
        }
     }
   },
   methods:{
       filterNode(value, data) {
        if (!value) return true;
          return data.title.indexOf(value) !== -1;
       },
        renderContent(h, { node, data, store }) {
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
              <span>{node.label}</span>
            </span>
            <span>
              <el-button style="font-size: 12px;" type="text" on-click={ () => this.chooseDept(data) }>选择</el-button>
            </span>
          </span>);
      },
      chooseDept(data){
          this.$emit('handleChooseDept',data);
      },
      treeDeptWithUnit(){
          this.$get(this.API.treeDept,{
              dwbh:this.dwbh,
              dwmc:this.dwmc,
              zts:'1,3'
          }).then(res=>{
              if(res.state == 'success'){
                  this.treeData = res.data;
              }else{

              }
          })
      }
   },
   props:{
        show: {
            type: Boolean,
            default:false
        },
        dwbh:{
            type: String,
            default:'' 
        },
        dwmc:{
            type: String,
            default:''
        }
   },
   watch: {
        show (n,o) {
            this.visible = this.show;
            if(!!n){
               this.treeDeptWithUnit();
            }else{

            }
        },
        filterText(val) {
            this.$refs.tree2.filter(val);
        }
    },
   components: {}
 }
</script>

<style scoped>
.dialog-tree{
    padding: 8px 10px;
}
.dialog-tree section:nth-of-type(2){
    margin: 10px 0;
}
.tree{
    margin: 10px 0;
    max-height: 500px;
    width:100%;
    border-bottom: 1px solid rgb(214, 213, 213);
    overflow-y:auto;
}
</style>
