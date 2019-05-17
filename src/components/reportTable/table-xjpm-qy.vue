<template>
	<div>
		<table class="table table-xjpmQy" border>
			<!-- <caption>问题星级评分-区域</caption> -->
			<thead>
				<tr v-if="tableData.length != 0">
					<th>分类</th>
					<th>{{ tableData[0].star1 }}</th>
					<th>{{ tableData[0].star2 }}</th>
					<th>{{ tableData[0].star3 }}</th>
					<th>{{ tableData[0].star4 }}</th>
					<th>{{ tableData[0].star5 }}</th>
					<th>{{ tableData[0].starbad }}</th>
					<th>{{ tableData[0].staravg }}</th>
					<th>{{ tableData[0].wtgbs }}</th>
					<th>{{ tableData[0].wtzs }}</th>
					<th>{{ tableData[0].zgs }}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(table, i) in [...tableData].splice(1, limit - 1)" :key="i" v-if="tableData.length != 0">
					<td :title="table.qymc">{{ table.qymc }}</td>
					<td>
						<a href="javaScript:void(0)" @click="handleWtpfQy(table.qybh, 'star1', table.star1)">{{ table.star1 }}</a>
					</td>
					<td>
						<a href="javaScript:void(0)" @click="handleWtpfQy(table.qybh, 'star2', table.star2)">{{ table.star2 }}</a>
					</td>
					<td>
						<a href="javaScript:void(0)" @click="handleWtpfQy(table.qybh, 'star3', table.star3)">{{ table.star3 }}</a>
					</td>
					<td>
						<a href="javaScript:void(0)" @click="handleWtpfQy(table.qybh, 'star4', table.star4)">{{ table.star4 }}</a>
					</td>
					<td>
						<a href="javaScript:void(0)" @click="handleWtpfQy(table.qybh, 'star5', table.star5)">{{ table.star5 }}</a>
					</td>
					<td>{{ table.starbad }}</td>
					<td>{{ table.staravg }}</td>
					<td>
						<a href="javaScript:void(0)" @click="handleWtpfQy(table.qybh, 'wtgbs', table.wtgbs)">{{ table.wtgbs }}</a>
					</td>
					<td>
						<a href="javaScript:void(0)" @click="handleWtpfQy(table.qybh, 'wtzs', table.wtzs)">{{ table.wtzs }}</a>
					</td>
					<td>{{ table.zgs }}</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<td>总计</td>
					<td>{{ total.star1 }}</td>
					<td>{{ total.star2 }}</td>
					<td>{{ total.star3 }}</td>
					<td>{{ total.star4 }}</td>
					<td>{{ total.star5 }}</td>
					<td>{{ total.starbad }}</td>
					<td>{{ total.staravg }}</td>
					<td>{{ total.wtgbs }}</td>
					<td>{{ total.wtzs }}</td>
					<td>{{ total.zgs }}</td>
				</tr>
			</tfoot>
		</table>
	</div>
</template>
<script>
export default {
	data() {
		return {
			thList: [],
			tdList: [],
			limit: '',
			object: {}
		};
	},
	updated() {
		this.limit = this.tableData.length;
	},

	methods: {
		handleWtpfQy(qybh, data1, data2) {
			this.object = {};
			this.object[data1] = data2;
			this.object['qybh'] = qybh;
			this.$emit('handleWtpfQy', this.object);
		}
	},
	computed: {},
	props: {
		tableData: {
			type: Array,
			default: function() {
				return [];
			}
		},
		total: {
			type: Object,
			default: function() {
				return {};
			}
		}
	}
};
</script>
<style scoped>
.table {
	border: 1px solid #ebeef5;
	width: 100%;
}
.table thead {
	width: calc(100% - 1.2em) !important;
	background: #f5f7fa;
}
.table thead,
.table tfoot {
	width: calc(100% - 1.2em) !important;
}
.table thead,
tbody tr,
.table tfoot {
	display: table;
	width: 100%;
	table-layout: fixed;
}
.table thead,
tbody tr {
	display: table;
	width: 100%;
	table-layout: fixed;
}
.table tbody {
	display: block;
	height: 51vh;
	width: 100%;
	overflow-y: scroll;
}

.table tr,
.table th {
	height: 37px !important;
	text-align: center;
	border-right: 1px solid #ebeef5;
	padding: 0;
	margin: 0;
	vertical-align: middle;
}
.table td:first-child,
.table th:first-child {
	width: 12%;
}
.table tr:last-child {
	border-bottom: 1px solid #ebeef5;
}
.table td {
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	border-right: 1px solid #ebeef5;
}
</style>
