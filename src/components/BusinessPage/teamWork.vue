<template>
    <div class="project-teamwork">
        <div class="project-teamwork-content">
          <!-- 2018-12.04修改 甲方责任人不可见修改中标人和团队成员 -->
					<teamCyz :xmbh="xmbh" :xmmc="xmInfo.xmmc" :tabName="tabName" :dwmc="xmInfo.dwmc" :jsJf="jsJf"></teamCyz>
   <!--         <el-tabs tab-position="top" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="参与者" name="first">
                    <teamCyz :xmbh="xmbh" :xmmc="xmInfo.xmmc" :tabName="tabName" :dwmc="xmInfo.dwmc" :jsJf="jsJf"></teamCyz>
                </el-tab-pane>
               <el-tab-pane label="接包团队" name="second" v-if="!jsJf">
                    <teamTdcy :tabName="tabName" :xmbh="xmbh"></teamTdcy>
                </el-tab-pane>
            </el-tabs> -->
        </div>
    </div>
</template>

<script>
import teamCyz from "@/components/teamwork/team-cyz.vue";
import teamTdcy from "@/components/teamwork/team-tdcy.vue";
export default {
  data() {
    return {
      activeName: "first",
      tabName: "",
      jsJf: false
    };
  },
  mounted() {
    if (sessionStorage.username == this.xmInfo.jfzrrxm) {
      this.jsJf = true;
    }
  },
  props: {
    xmbh: {
      type: String,
      default: ""
    },
    xmInfo: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      this.tabName = tab.name;
    }
  },
  components: { teamCyz, teamTdcy }
};
</script>

<style scoped>
.project-teamwork {
  padding: 20px;
}
.project-teamwork-content {
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  padding: 10px;
  /* height: calc(100vh - 150px); */
}
.el-tab-pane {
  max-height: calc(100vh - 230px);
  overflow-y: auto;
  margin: 8px 0;
}
</style>
