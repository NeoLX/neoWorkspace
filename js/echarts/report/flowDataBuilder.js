var today = new Date();
var flow = {
	mainFlow: [{
		name: "活期账户资金流",
		subFlow: [{
			name: "投资类交易",
			dist: [{
					name: "定期存款"
				},
				{
					name: "理财"
				},
				{
					name: "基金"
				},
				{
					name: "银证"
				},
				{
					name: "保险"
				},
				{
					name: "债券"
				},
				{
					name: "国债"
				},
				{
					name: "贵金属"
				},
				{
					name: "原油"
				},
				{
					name: "账户外汇"
				},
				{
					name: "结售汇"
				},
				{
					name: "行外投资"
				}
			]
		}, {
			name: "结算类交易",
			dist: [{
					name: "现金存取"
				},
				{
					name: "支付宝"
				},
				{
					name: "财付通"
				},
				{
					name: "银联"
				},
				{
					name: "其他网络支付"
				},
				{
					name: "跨行汇款"
				},
				{
					name: "消费"
				},
				{
					name: "信用卡转账"
				},
				{
					name: "信用卡自动还款"
				},
				{
					name: "代收代付"
				},
				{
					name: "个人贷款"
				},
				{
					name: "公积金"
				}
			]
		}]
	}, {
		name: "定期账户资金流",
		subFlow: [{
			name: "定期账户交易",
			dist: [{
					name: "活期存款"
				},
				{
					name: "定期转存"
				},
				{
					name: "行内转账"
				},
				{
					name: "跨行汇款"
				},
				{
					name: "现金存取"
				},
				{
					name: "信用卡转账"
				},
				{
					name: "国债"
				},
				{
					name: "其他"
				}
			]
		}]
	}, {
		name: "信用卡账户资金流",
		subFlow: [{
			name: "消费",
			dist: [{
					name: "跨行消费"
				},
				{
					name: "其他消费"
				},
				{
					name: "分期业务"
				}
			]
		}, {
			name: "资金往来",
			dist: [{
					name: "现金存取"
				},
				{
					name: "信用卡自动还款"
				},
				{
					name: "信用卡转账"
				},
				{
					name: "行内转账"
				},
				{
					name: "跨行汇款"
				},
				{
					name: "其他转账"
				}
			]
		}, {
			name: "其他业务",
			dist: [{
					name: "代收代付"
				},
				{
					name: "个人贷款"
				},
				{
					name: "利息及手续费"
				},
				{
					name: "账户调整"
				},
				{
					name: "其他"
				}
			]
		}]
	}]
};

var titles = {
	drAmount: "借方(资金流出)",
	crAmount: "贷方(资金流入)",
	diff: "扎差(存款净流入)",
	drCount: "借方笔数",
	crCount: "贷方笔数",
}
var colors = {
	drAmount: "#c12e34",
	crAmount: "#0098d9",
	diff: "#2b821d",
	drCount: "#c12e34",
	crCount: "#0098d9",
}

var createMonLabel = function() {
	var arr = [];
	for(let i = 0; i < 12; i++) {
		let d = "";
		if(today.getMonth() + i > 12) {
			d = (today.getFullYear() - 0 + 1) + "年" + (today.getMonth() - 12 + i);
		} else {
			d = today.getFullYear() + "年" + (today.getMonth() - 0 + i);
		}
		arr.push(d);
	}
	return arr;
}

var createRandomFlow = function() {
	var f = JSON.parse(JSON.stringify(flow));
	// if(!prev){

	f.drAmount = 0;
	f.crAmount = 0;
	f.diff = 0;
	f.drCount = 0;
	f.crCount = 0;
	for(let m in f.mainFlow) {
		let mainFlow = f.mainFlow[m];

		mainFlow.drAmount = 0;
		mainFlow.crAmount = 0;
		mainFlow.diff = 0;
		mainFlow.drCount = 0;
		mainFlow.crCount = 0;
		for(let s in mainFlow.subFlow) {
			let subFlow = mainFlow.subFlow[s];
			subFlow.drAmount = 0;
			subFlow.crAmount = 0;
			subFlow.diff = 0;
			subFlow.drCount = 0;
			subFlow.crCount = 0;
			for(let d in subFlow.dist) {
				let dist = subFlow.dist[d];
				dist.drAmount = Math.floor(Math.random() * 1000000) / 100;
				subFlow.drAmount += dist.drAmount;
				dist.crAmount = Math.floor(Math.random() * 1000000) / 100;
				subFlow.crAmount += dist.crAmount;
				dist.diff = dist.crAmount - dist.drAmount;
				subFlow.diff += dist.diff;
				dist.drCount = Math.floor(Math.random() * 1000);
				subFlow.drCount += dist.drCount;
				dist.crCount = Math.floor(Math.random() * 1000);
				subFlow.crCount += dist.crCount;
				subFlow.dist.push(dist);
			}
			mainFlow.drAmount += subFlow.drAmount;
			mainFlow.crAmount += subFlow.crAmount;
			mainFlow.diff += subFlow.diff;
			mainFlow.drCount += subFlow.drCount;
			mainFlow.crCount += subFlow.crCount;
		}

		f.drAmount += mainFlow.drAmount;
		f.crAmount += mainFlow.crAmount;
		f.diff += mainFlow.diff;
		f.drCount += mainFlow.drCount;
		f.crCount += mainFlow.crCount;
	}
	// }
	return f;
}

var build = function() {
	var datas = {};

	for(var m in monthLabel) {
		datas[monthLabel[m]] = createRandomFlow();
	}
	return datas;
}

var getTotalLevelData = function(seriesName) {
	let arr = [];
	for(var d in flowData) {
		let flow = flowData[d];
		for(var n in flow) {
			if(n == seriesName) {
				var value;
				if(seriesName == 'drAmount') {
					value = 0 - flow[seriesName];
				} else {
					value = flow[seriesName];
				}
				var obj = {
					name: titles[seriesName],
					value: value
				};
				arr.push(obj);
			}
		}
	}
	return arr;
}

var monthLabel = createMonLabel();
var flowData = build();
var tld = getTotalLevelData("drAmount");
// console.log(JSON.stringify(datas));