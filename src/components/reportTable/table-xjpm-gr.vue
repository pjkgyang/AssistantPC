<template>
	<div class="out-table">
		<table class="table table-xjpm-gr" border>
			<thead>
				<tr v-if="tableData.length != 0">
					<!-- <th>排名</th> -->
					<th>{{ tableData[0].username }}</th>
					<!-- <th v-for="th in thList">{{th.mc}}</th>     -->
					<th>{{ tableData[0].nickname }}</th>
					<th>{{ tableData[0].qymc }}</th>
					<th>{{ tableData[0].star1 }}</th>
					<th>{{ tableData[0].star2 }}</th>
					<th>{{ tableData[0].star3 }}</th>
					<th>{{ tableData[0].star4 }}</th>
					<th>{{ tableData[0].star5 }}</th>
					<th>{{ tableData[0].starbad }}</th>
					<th>{{ tableData[0].staravg }}</th>
					<th>{{ tableData[0].wtgbs }}</th>
					<th>{{ tableData[0].wtzs }}</th>
					<!-- <th>{{tableData[0].xmtdgs}}</th>
                <th>{{tableData[0].gczjgs}}</th>
                <th>{{tableData[0].cpzjgs}}</th> -->
					<th>{{ tableData[0].zgs }}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(table, i) in [...tableData].splice(1, limit - 1)" :key="i" v-if="tableData.length != 0">
					<!-- <td>{{(nowPage*10)+(i+1)}}</td> -->
					<td :title="table.username">{{ table.username }}</td>
					<td :title="table.nickname">{{ table.nickname }}</td>
					<td :title="table.qymc">{{ table.qymc }}</td>
					<td>
						<a href="javaScript:void(0)" @click="handleWtpfQy(table, 'star1', table.star1)">{{ table.star1 }}</a>
					</td>
					<td>
						<a href="javaScript:void(0)" @click="handleWtpfQy(table, 'star2', table.star2)">{{ table.star2 }}</a>
					</td>
					<td>
						<a href="javaScript:void(0)" @click="handleWtpfQy(table, 'star3', table.star3)">{{ table.star3 }}</a>
					</td>
					<td>
						<a href="javaScript:void(0)" @click="handleWtpfQy(table, 'star4', table.star4)">{{ table.star4 }}</a>
					</td>
					<td>
						<a href="javaScript:void(0)" @click="handleWtpfQy(table, 'star5', table.star5)">{{ table.star5 }}</a>
					</td>
					<td>{{ table.starbad }}</td>
					<td>{{ table.staravg }}</td>
					<td>
						<a href="javaScript:void(0)" @click="handleWtpfQy(table, 'wtgbs', table.wtgbs)">{{ table.wtgbs }}</a>
					</td>
					<td>
						<a href="javaScript:void(0)" @click="handleWtpfQy(table, 'wtzs', table.wtzs)">{{ table.wtzs }}</a>
					</td>
					<!-- <td>{{table.xmtdgs}}</td>
                <td>{{table.gczjgs}}</td>
                <td>{{table.cpzjgs}}</td> -->
					<td>{{ table.zgs }}</td>
					<!-- <td><a href="javaScript:void(0)" @click="handleWtpfQy(table.unitnum,'xmtdgs',table.xmtdgs)">{{table.xmtdgs}}</a></td>
                <td><a href="javaScript:void(0)" @click="handleWtpfQy(table.unitnum,'gczjgs',table.gczjgs)">{{table.gczjgs}}</a></td>
                <td><a href="javaScript:void(0)" @click="handleWtpfQy(table.unitnum,'cpzjgs',table.cpzjgs)">{{table.cpzjgs}}</a></td>
                <td><a href="javaScript:void(0)" @click="handleWtpfQy(table.unitnum,'zgs',table.zgs)">{{table.zgs}}</a></td> -->
				</tr>
			</tbody>
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
		handleWtpfQy(data, data1, data2) {
			this.object = {};
			this.object[data1] = data2;
			this.object['username'] = data.username;
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
		},
		nowPage: {
			type: Number,
			default: 1
		}
	}
};
</script>
<style scoped>
.out-table {
	width: 100%;
	overflow-x: auto;
}
.table {
	border: 1px solid #ebeef5;
	width: 100%;
	margin-bottom: 10px !important;
}
.table thead {
	width: calc(100% - 1.2em) !important;
	background: #f5f7fa;
}
.table thead,
tbody tr {
	display: table;
	width: 100%;
	table-layout: fixed;
}
.table tbody {
	display: block;
	height: 380px;
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
.table td:nth-child(1),
.table th:nth-child(1),
.table td:nth-child(2),
.table th:nth-child(2) {
	width: 80px;
}
.table td:nth-child(3),
.table th:nth-child(3) {
	width: 10.5%;
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
