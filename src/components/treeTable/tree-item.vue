<template>
  <div :class="tdClass">
    <span
      class="before-line"
      v-if="root !== 0 && nodes !== 1"
      :style="{ left: model.bLeft + 'px' }"
    ></span>
    <table>
      <tr>
        <td :colspan="colSpan">
          <table v-if="!isAna">
            <tr class="leve" :class="levelClass">
              <td class="td1">
                <div class="td-title" @dblclick="handlerExpand(model)" colcenter>
                  <span
                    v-if="model.children.length > 0"
                    style="z-index: 100;cursor: pointer;"
                    class="fa fa-folder"
                    :class="{ 'fa fa-folder-open': model.isExpand }"
                    @click="handlerExpand(model)"
                  ></span>
                  &nbsp;
                  <a class="ellipsis">
                    <span :title="model.title">{{ model.title }}</span>
                  </a>
                </div>
              </td>
              <td class="td2">{{ model.bmdm }}</td>
              <td class="td2">{{ model.sortCode }}</td>
              <td class="td3">{{ model.dataStatus == 1 ? '启用' : '禁用' }}</td>
              <td class="td6">
                <a class="reset" href="javascript:;" @click="actionFunc(model, 'add')">添加下级</a>

                <span v-if="!!model.parentId">
                  <i class="line"></i>
                  <a class="reset" href="javascript:;" @click="actionFunc(model, 'edit')">编辑</a>
                  <i class="line"></i>
                  <a class="delete" href="javascript:;" @click="deleteFunc(model)">删除</a>
                  <span v-if="model.dataStatus == 3">
                    <i class="line"></i>
                    <a class="reset" href="javascript:;" @click="startRejectFunc(model, 'start')">启用</a>
                  </span>
                  <span v-if="model.dataStatus == 1">
                    <i class="line"></i>
                    <a
                      class="delete"
                      href="javascript:;"
                      @click="startRejectFunc(model, 'reject')"
                    >禁用</a>
                  </span>
                </span>
              </td>
            </tr>
          </table>

          <table v-if="!!isAna">
            <tr class="leve" :class="levelClass">
              <td class="td1" style="width:400px">
                <div class="td-title" @dblclick="handlerExpand(model)" colcenter>
                  <span
                    v-if="model.children.length > 0"
                    style="z-index: 100;cursor: pointer;"
                    class="fa fa-folder"
                    :class="{ 'fa fa-folder-open': model.isExpand }"
                    @click="handlerExpand(model)"
                  ></span>
                  &nbsp;
                  <a class="ellipsis">
                    <span :title="model.title">{{ model.title }}</span>
                  </a>
                </div>
              </td>
              <td class="td4">
                <a href="javaScript:;" @click="handleRouter(model,'yfwzn')">{{ model.zs }}</a>
              </td>
              <td class="td4">
                <a href="javaScript:;" @click="handleRouter(model,'yfwzn')">{{ model.yfwzn }}</a>
              </td>
              <td class="td4">
                <a href="javaScript:;" @click="handleRouter(model,'wfwzn')">{{ model.wfwzn}}</a>
              </td>
              <td class="td4">
                <a href="javaScript:;" @click="handleRouter(model,'yxxhzc')">{{ model.yxxhzc}}</a>
              </td>
              <td class="td4">
                <a href="javaScript:;" @click="handleRouter(model,'wxxhzc')">{{ model.wxxhzc}}</a>
              </td>
              <td class="td4">{{ model.xxhfgl}}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <div v-show="model.isExpand" class="other-node" :class="otherNodeClass">
      <tree-item
        :isAna="isAna"
        v-for="(m, i) in model.children"
        :key="String('child_node' + i)"
        :num="i"
        :root="1"
        @actionFunc="actionFunc"
        @deleteFunc="deleteFunc"
        @startRejectFunc="startRejectFunc"
        @handlerExpand="handlerExpand"
        @handleRouter="handleRouter"
        :nodes.sync="model.children.length"
        :trees.sync="trees"
        :model.sync="m"
      ></tree-item>
    </div>
  </div>
</template>

<script>
export default {
  name: "treeItem",
  props: ["model", "num", "nodes", "root", "trees", "isAna"],
  data() {
    return {
      parentNodeModel: null
    };
  },
  computed: {
    colSpan() {
      return this.root === 0 ? "" : 6;
    },
    tdClass() {
      return this.root === 0 ? "td-border" : "not-border";
    },
    levelClass() {
      return this.model ? "leve-" + this.model.level : "";
    },
    childNodeClass() {
      return this.root === 0 ? "" : "child-node";
    },
    otherNodeClass() {
      return this.model ? "other-node-" + this.model.level : "";
    }
  },
  watch: {
    // 'model': {
    // 	handler() {
    // 		console.log('对象变化', this.model.isExpand)
    // 	},
    // 	deep: true
    // }
  },
  methods: {
    handleRouter(model, type) {
      this.$emit("handleRouter", model, type);
    },
    getParentNode(m) {
      // 查找点击的子节点
      var recurFunc = (data, list) => {
        data.forEach(l => {
          if (l.id === m.id) this.parentNodeModel = list;
          if (l.children) {
            recurFunc(l.children, l);
          }
        });
      };
      recurFunc(this.trees, this.trees);
    },
    handlerExpand(m) {
      this.$emit("handlerExpand", m);
    },
    deleteFunc(m) {
      this.$emit("deleteFunc", m);
      // this.getParentNode(m);
      // console.log(this.parentNodeModel)
      // if (this.parentNodeModel.hasOwnProperty('children')) {
      // 	console.log('父级是跟节点', this.parentNodeModel)
      // 	this.parentNodeModel.children.splice(this.parentNodeModel.children.indexOf(m), 1)
      // } else if (this.parentNodeModel instanceof Array) {
      // 	console.log('跟节点', this.parentNodeModel)
      // 	this.parentNodeModel.splice(this.parentNodeModel.indexOf(m), 1)
      // }
    },
    startRejectFunc(m, type) {
      this.$emit("startRejectFunc", m, type);
    },
    actionFunc(m, type) {
      this.getParentNode(m);
      this.$emit("actionFunc", m, type, this.parentNodeModel);
    }
  },
  filters: {
    formatDate: function(date) {
      return date;
    }
  }
};
</script>
<style scoped>
.ellipsis {
  color: #333;
}
.fa {
  color: #409eff !important;
}
</style>
