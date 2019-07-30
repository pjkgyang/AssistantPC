<template>
  <div class="dialog-container">
    <el-dialog title="应用配置详情" width="1000px" top="30px" :visible.sync="visible" :close-on-click-modal="false" @close="$emit('update:show', false)"
      :show="show">
      <div class="pd-10 layout table_grid">
        <table>
        	<tr >
        		<th>应用名称</th>
        		<td>{{ dataInfo.fwmc }}</td>
        		<th>使用部门</th>
        		<td>{{ dataInfo.fwdx }}</td>
        	</tr>
        	<tr >
        		<th>业务部门联系人</th>
        		<td>{{ dataInfo.bsyj }}</td>
        		<th>业务部门联系方式</th>
        		<td>{{ dataInfo.fwzn=='0'?'无':'有' }}</td>
        	</tr>
        	<tr >
        		<th>信息中心联系人</th>
        		<td>{{ dataInfo.bsyj }}</td>
        		<th>信息中心联系方式</th>
        		<td>{{ dataInfo.fwzn=='0'?'无':'有' }}</td>
        	</tr>
        	<tr>
        		<th>上线日期</th>
        		<td>{{ dataInfo.fwlb }}</td>
        		<th>服务到期日期</th>
        		<td>{{ dataInfo.fwnr }}</td>
        	</tr>
          <tr >
          	<th>使用对象</th>
          	<td>{{ dataInfo.bsyj }}</td>
          	<th>承建单位</th>
          	<td>{{ dataInfo.fwzn=='0'?'无':'有' }}</td>
          </tr>
          <tr >
          	<th>单位联系人</th>
          	<td>{{ dataInfo.bsyj }}</td>
          	<th>单位联系方式</th>
          	<td>{{ dataInfo.fwzn=='0'?'无':'有' }}</td>
          </tr>
          <tr >
          	<th>访问地址</th>
          	<td colspan="3">{{ dataInfo.bsyj }}</td>
          </tr>
          <tr >
          	<th>备注</th>
          	<td colspan="3">{{ dataInfo.bsyj }}</td>
          </tr>
        </table>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        visible: this.show,
        dataInfo:{
          yymc:'1111111',
          sybm:'22222',
          ywbmlxr:'ddd',
          ywbmlxfs:'dasdads',
          xxzxlxr:'asdasd',
          xxzxlxfs:'sadad',
          sxrq:'asasasd',
          fwdqrq:'adasdas',
          sydx:'asdasdasd',
          cjdw:'zxzzz',
          dwlxr:'zxxxxx',
          dwlxfs:'zzzz',
          fwdz:'aaaaaaaaaaa',
          bz:'ssssss'
        }
      };
    },
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    components: {},
    methods: {},
    watch: {
      show() {
        this.visible = this.show;
        if (this.show) {

        } else {}
      }
    }
  };
</script>
<style scoped lang="scss">

</style>
