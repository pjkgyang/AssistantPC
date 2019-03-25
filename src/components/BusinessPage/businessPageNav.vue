<template>
  <div>
      <div class="main_Navbar">
            <item-nav @handle="dropdownSelect" :options="options[0]" :droTitle="title.first"></item-nav>    
            <item-nav @handle="dropdownSelectTwo" :options="options[1]" :droTitle="title.second"></item-nav>  
            <item-nav @handle="dropdownSelectThree" :options="options[2]" :droTitle="title.third"></item-nav>
            <item-nav @handle="dropdownSelectFour" :options="options[3]" :droTitle="title.four"></item-nav>               
      </div>
  </div>
</template>
<script>
import itemNav from "@/components/BusinessPage/itemNavbar.vue";
import { getResponsibleTaskList } from "@/api/common.js";
import axios from "axios";
export default {
  data() {
    return {
      options: [[], [], [], []]
    };
  },
  props: {
    title: {
      type: Object,
      default: function() {
        return {
          first: "工程战队",
          second: "分包性质",
          third: "招标中",
          four: "购销合同"
        };
      }
    }
  },
  methods: {
    dropdownSelect(data) {
      this.title.first = data.split("&")[0];
      this.$emit("dropdownSelect", data.split("&")[1]);
    },
    dropdownSelectTwo(data) {
      this.title.second = data.split("&")[0];
      this.$emit("dropdownSelectTwo", data.split("&")[1]);
    },
    dropdownSelectThree(data) {
      this.title.third = data.split("&")[0];
      this.$emit("dropdownSelectThree", data.split("&")[1]);
    },
    dropdownSelectFour(data) {
      this.title.four = data.split("&")[0];
      this.$emit("dropdownSelectFour", data.split("&")[1]);
    },

    // 获取menulist
    getMenu(type, num, isInterface) {
      getResponsibleTaskList({
        name: type,
        isInterface: isInterface || ""
      }).then(({ data }) => {
        if (!!data && data.state == "success") {
          let map = data.data;
          let Arr = Object.keys(map);
          let McArr = Object.values(map);

          for (var i = 0; i < Arr.length; i++) {
            this.options[num].push({
              label: Arr[i],
              mc: McArr[i]
            });
          }
          sessionStorage.setItem(type, JSON.stringify(this.options[num]));
        }
      });
    }
  },
  beforeMount() {
    if (sessionStorage.getItem("FbXz") == null) {
      this.getMenu("FbXz", 1); //获取分包性质列表
      this.getMenu("ZbZt", 2); //获取分包状态列表
      this.getMenu("GxHt", 3); //获取购销合同列表
      this.getMenu("gczd", 0, true); //获取分包状态列表
      this.options[0].unshift({ label: "", mc: "工程战队" });
      this.options[1].unshift({ label: "", mc: "分包性质" });
      this.options[3].unshift({ label: "", mc: "购销合同" });
    } else {
      this.options[1] = JSON.parse(sessionStorage.getItem("FbXz"));
      this.options[2] = JSON.parse(sessionStorage.getItem("ZbZt"));
      this.options[3] = JSON.parse(sessionStorage.getItem("GxHt"));
      this.options[0] = JSON.parse(sessionStorage.getItem("gczd"));
    }
  },
  components: { itemNav }
};
</script>
<style scoped>
.main_Navbar {
  width: 100%;
  background: #eee;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  box-shadow: 0 1px 5px #999;
}
.main_Navbar > div {
  padding: 8px 0;
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
</style>

