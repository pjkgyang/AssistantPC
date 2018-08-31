<template>
 <div class="project-teamwork">
    <div class="project-teamwork-content">
        <el-tabs tab-position="top"  v-model="activeName"  @tab-click="handleClick">
            <el-tab-pane label="参与者"  name="first">
                <teamCyz :xmbh="xmbh" :xmmc="xmmc" :tabName="tabName" :dwmc="dwmc"></teamCyz>
            </el-tab-pane>
            <el-tab-pane label="团队成员"  name="second" >
                <teamTdcy :tabName="tabName" :xmbh="xmbh"></teamTdcy>
            </el-tab-pane>
        </el-tabs>
    </div>
 </div>
</template>

<script>
import teamCyz from '@/components/teamwork/team-cyz.vue'
import teamTdcy from '@/components/teamwork/team-tdcy.vue'
 export default {
   data () {
     return {
            activeName:'first',
            tabName:'',    
       }
   },
   mounted(){
  
   },
   props:{
     xmbh:{
         type:String,
         default:''
     },
     xmmc:{
         type:String,
         default:''
     },
     dwmc:{
         type:String,
         default:''
     }
   },
   methods:{
     handleClick(tab, event) {
        this.tabName = tab.name
      }
   },
   components: {teamCyz,teamTdcy}
 }
</script>

<style scoped>
.project-teamwork{
    padding: 20px;
}
.project-teamwork-content{
    /* box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); */
    background: rgba(255, 255, 255, 1);
    border-radius: 5px;
    padding: 10px;
    height:calc(100vh - 150px);
}
.el-tab-pane{
    height:calc(100vh - 230px);
    overflow-y: auto;
}
</style>
