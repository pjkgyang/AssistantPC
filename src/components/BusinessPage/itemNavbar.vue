<template>
  <div>
        <div>
            <el-dropdown @command="handleCommand"  trigger="click">
                <span class="el-dropdown-link" >
                    <span >{{droTitle}}</span><i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item  v-for="(option,index) in options"  :command="option.mc +'&'+option.label" :key="index">{{option.mc}}</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    droTitle: {
      type: String,
      default: "所有业务11"
    },
    options: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  methods: {
    handleCommand(command) {
      this.$emit("handle", command);
    }
  }
};
</script>
<style scoped>
.main_Navbar {
  width: 100%;
  height: 40px;
  background: #eee;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 1px 5px #999;
}
.el-dropdown-link {
  cursor: pointer;
  color: #999;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-dropdown-menu__item {
  line-height: 25px;
}
.el-row {
  border: 1px solid #000;
}
.el-icon-arrow-down {
  border-radius: 50%;
  padding: 2px;
  background-color: #ccc;
}
.el-dropdown-menu {
  max-height: 480px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>