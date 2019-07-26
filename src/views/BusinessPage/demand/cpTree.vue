<template>
 <div>
    <el-tree
        class="filter-tree"
        :data="options"
        :props="defaultProps"
        node-key="id"
        :default-expanded-keys="['DSROOT']"
        @node-click="handleNodeClick"
        ref="tree2">
   </el-tree>
 </div>
</template>

<script>
 export default {
   data () {
     return {
         defaultProps:{
            value:'id',
            label:'title'
         },
         options:[]
     }
   },
   mounted(){
       this.demandProductTree();
   },
   methods:{
       handleNodeClick(data) {
         this.$emit('handleNodeClick',data);
       },
       demandProductTree(){
           this.$get(this.API.demandProductTree, {}).then(res => {
            if (res.state == 'success') {
              this.options = res.data;
            } else {

            }
          })
       }
   },
   components: {}
 }
</script>

<style scoped>

 
</style>
