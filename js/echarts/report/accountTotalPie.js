var accountTotalView = function(pieDom, lineDom, pieChartCallback) {
	var pie = echarts.init(document.getElementById(pieDom));
	var line = echarts.init(document.getElementById(lineDom));
	var today = new Date();

	var createData = function(labels, mLabels) {
		var daysData = {};
		for(var j = 0; j <= mLabels.length; j++) {
			var m = mLabels[j];
			var dataArr = [];
			for(var i in labels) {
				var o = {
					name: labels[i],
					value: Math.floor(Math.random() * 10000000) / 100,
					itemStyle: {
						normal: {
							color: dataColor[i]
						}
					}
				};
				dataArr.push(o);
			}
			dataArr.sort(function(a, b) {
				if(a.value > b.value) {
					return 1
				} else {
					return -1
				}
			})
			daysData[m] = dataArr;
		}
		return daysData;
	};
	var getLabelData = function(label, data) {
		var arr = [];
		for(var i in data) {
			for(var j in data[i]) {
				if(data[i][j].name == label) {
					arr.push({
						name: i,
						value: data[i][j].value,
						itemStyle: data[i][j].itemStyle
					});
				}
			}
		}
		return arr;
	};
	var getLabelTotalValue = function(data) {
		var arr = [];
		for(var i in data) {
			let d = {
				name: i,
				value: 0
			};
			for(var j in data[i]) {
				d.value += data[i][j].value;
			}
			arr.push(d);
		}
		return arr;
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

	var dataLabels = ['个人存款（活期）', '个人存款（定期）', '理财', '基金', '银证', '保险', '债券', '国债', '贵金属', '原油'];
	var dataColor = ['#d87c7c', '#919e8b', '#d7ab82', '#6e7074', '#61a0a8', '#efa18d', '#787464', '#cc7e63', '#724e58', '#4b565b'];
	var monLabels = createMonLabel();
	var datas = createData(dataLabels, monLabels);

	var pieOption = {
		title: {
			text: '资产总体情况分布图',
			subtext: '纯属虚构',
			x: 'center'
		},
		tooltip: {
			trigger: 'item',
			formatter: "{b} : {c} ({d}%)"
		},
		// legend: {
		// 	orient: 'vertical',
		// 	left: 'top',
		// 	data: dataLabels
		// },
		series: [{
			name: '分布情况',
			type: 'pie',
			radius: '55%',
			center: ['50%', '55%'],
			data: datas[today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate()],
			roseType: "radius",
			itemStyle: {
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}]
	};

	var initSelected = function(labels) {
		var selected = {
			"资产总额": true
		};
		for(var i in labels) {
			selected[labels[i]] = false;
		}
		return selected;
	}

	var legendData = JSON.parse(JSON.stringify(dataLabels));
	legendData.push("资产总额");

	var lineOption = {
		title: {
			text: '资产情况趋势图',
			subtext: '纯属虚构',
			x: 'left'
		},
		tooltip: {
			trigger: 'item',
			backgroundColor: 'rgba(50,50,50,0.3)',
			//			borderColor:'rgba(50,50,50,0.7)',
			formatter: function(opts) {
				//				alert(opts.length);
				//		 var str = "";
				//		 for (var i in opts[0]) {
				//		 	str += "[" + i + "]=" + opts[0][i] + "\n";
				//		 }
				//		 alert(str);
				if(opts && opts instanceof Array && opts.length > 0) {

					var str = opts[0].name + "<br/><ul>";
					for(var i in opts) {
						str += "<li style='color:" + opts[i].color + "'>" + opts[i].seriesName + ":" + Math.floor(opts[i].value * 100) / 100 + "元</li>";
					}
					str += "</ul>";
					return str;
				}
			}
		},
		dataZoom: [{
			show: true,
			type: "slider",
			realtime: true,
			xAxisIndex: [0],
			top: '65%'
		}],
		legend: {
			orient: 'vertical',
			top: '8%',
			left: "0px",
			data: legendData,
			selected: initSelected(dataLabels)
		},
		grid: [{
				containLabel: true,
				top: '10%',
				left: '15%',
				height: '50%'
			}
			//		, {
			//			bottom: '10%',
			//			left: '15%',
			//			height: '15%'
			//		}
		],
		xAxis: [{
				type: 'category',
				data: monLabels,
				axisPointer: {
					show: true,
					type: 'shadow'
				}
			}
			//		, {
			//			type: 'category',
			//			gridIndex: 1,
			//			data: monLabels
			//		}
		],
		yAxis: [{
				name: "资产汇总金额",
				type: 'value',
				position: 'left'
			}
			//		,
			//			{
			//				scale: true,
			//				type: 'value',
			//				gridIndex: 1,
			//				axisLabel: {
			//					show: false
			//				},
			//				axisLine: {
			//					show: false
			//				},
			//				axisTick: {
			//					show: false
			//				},
			//				splitLine: {
			//					show: false
			//				}
			//			}
		],
		series: [
			//			{
			//				type: 'bar',
			//				name: "资产总额",
			//				tooltip: {
			//					formatter: function(opts) {
			//						return Math.floor(opts.value * 100) / 100 + "元";
			//					}
			//				},
			//				markPoint: {
			//					data: [{
			//							type: 'max',
			//							name: '最大值'
			//						},
			//						{
			//							type: 'min',
			//							name: '最小值'
			//						}
			//					],
			//					label: {
			//						normal: {
			//							formatter: function(opts) {
			//								return Math.floor(opts.value * 100) / 100 + "元";
			//							},
			//							textStyle: {
			//								color: "#000"
			//							}
			//						}
			//					}
			//				},
			//				data: getLabelTotalValue(datas),
			//				xAxisIndex: 1,
			//				yAxisIndex: 1
			//			},
			//						{
			//							type: 'bar',
			//							name: dataLabels[0],
			//							stack: "totalbar",
			//							areaStyle: {
			//								normal: {}
			//							},
			//							tooltip: {
			//								formatter: function(opts) {
			//									return opts.name + ":" + Math.floor(opts.value * 100) / 100 + "元";
			//								}
			//							},
			//							data: getLabelData(dataLabels[0], datas),
			//				xAxisIndex: 1,
			//				yAxisIndex: 1
			//						}, 
			//						{
			//							type: 'bar',
			//							name: dataLabels[1],
			//							stack: "totalbar",
			//							areaStyle: {
			//								normal: {}
			//							},
			//							tooltip: {
			//								formatter: function(opts) {
			//									return opts.name + ":" + Math.floor(opts.value * 100) / 100 + "元";
			//								}
			//							},
			//							data: getLabelData(dataLabels[1], datas),
			//				xAxisIndex: 1,
			//				yAxisIndex: 1
			//						}, {
			//							type: 'bar',
			//							name: dataLabels[2],
			//							stack: "totalbar",
			//							areaStyle: {
			//								normal: {}
			//							},
			//							tooltip: {
			//								formatter: function(opts) {
			//									return opts.name + ":" + Math.floor(opts.value * 100) / 100 + "元";
			//								}
			//							},
			//							data: getLabelData(dataLabels[2], datas),
			//				xAxisIndex: 1,
			//				yAxisIndex: 1
			//						}, {
			//							type: 'bar',
			//							name: dataLabels[3],
			//							stack: "totalbar",
			//							areaStyle: {
			//								normal: {}
			//							},
			//							tooltip: {
			//								formatter: function(opts) {
			//									return opts.name + ":" + Math.floor(opts.value * 100) / 100 + "元";
			//								}
			//							},
			//							data: getLabelData(dataLabels[3], datas),
			//				xAxisIndex: 1,
			//				yAxisIndex: 1
			//						}, {
			//							type: 'bar',
			//							name: dataLabels[4],
			//							stack: "totalbar",
			//							areaStyle: {
			//								normal: {}
			//							},
			//							tooltip: {
			//								formatter: function(opts) {
			//									return opts.name + ":" + Math.floor(opts.value * 100) / 100 + "元";
			//								}
			//							},
			//							data: getLabelData(dataLabels[4], datas),
			//				xAxisIndex: 1,
			//				yAxisIndex: 1
			//						}, {
			//							type: 'bar',
			//							name: dataLabels[5],
			//							stack: "totalbar",
			//							areaStyle: {
			//								normal: {}
			//							},
			//							tooltip: {
			//								formatter: function(opts) {
			//									return opts.name + ":" + Math.floor(opts.value * 100) / 100 + "元";
			//								}
			//							},
			//							data: getLabelData(dataLabels[5], datas),
			//				xAxisIndex: 1,
			//				yAxisIndex: 1
			//						}, {
			//							type: 'bar',
			//							name: dataLabels[6],
			//							stack: "totalbar",
			//							areaStyle: {
			//								normal: {}
			//							},
			//							tooltip: {
			//								formatter: function(opts) {
			//									return opts.name + ":" + Math.floor(opts.value * 100) / 100 + "元";
			//								}
			//							},
			//							data: getLabelData(dataLabels[6], datas),
			//				xAxisIndex: 1,
			//				yAxisIndex: 1
			//						}, {
			//							type: 'bar',
			//							name: dataLabels[7],
			//							stack: "totalbar",
			//							areaStyle: {
			//								normal: {}
			//							},
			//							tooltip: {
			//								formatter: function(opts) {
			//									return opts.name + ":" + Math.floor(opts.value * 100) / 100 + "元";
			//								}
			//							},
			//							data: getLabelData(dataLabels[7], datas),
			//				xAxisIndex: 1,
			//				yAxisIndex: 1
			//						}, {
			//							type: 'bar',
			//							name: dataLabels[8],
			//							stack: "totalbar",
			//							areaStyle: {
			//								normal: {}
			//							},
			//							tooltip: {
			//								formatter: function(opts) {
			//									return opts.name + ":" + Math.floor(opts.value * 100) / 100 + "元";
			//								}
			//							},
			//							data: getLabelData(dataLabels[8], datas),
			//				xAxisIndex: 1,
			//				yAxisIndex: 1
			//						}, {
			//							type: 'bar',
			//							name: dataLabels[9],
			//							stack: "totalbar",
			//							areaStyle: {
			//								normal: {}
			//							},
			//							tooltip: {
			//								formatter: function(opts) {
			//									return opts.name + ":" + Math.floor(opts.value * 100) / 100 + "元";
			//								}
			//							},
			//							data: getLabelData(dataLabels[9], datas),
			//				xAxisIndex: 1,
			//				yAxisIndex: 1
			//						}, 
			{
				type: 'line',
				name: "资产总额",
				data: getLabelTotalValue(datas),
				yAxisIndex: 0
			},
			{
				type: 'line',
				name: dataLabels[0],
				stack: "total",
				areaStyle: {
					normal: {}
				},
				data: getLabelData(dataLabels[0], datas),
				yAxisIndex: 0
			}, {
				type: 'line',
				name: dataLabels[1],
				stack: "total",
				areaStyle: {
					normal: {}
				},
				//							tooltip: {
				//								formatter: function(opts) {
				//									return opts.name + ":" + Math.floor(opts.value * 100) / 100 + "元";
				//								}
				//							},
				data: getLabelData(dataLabels[1], datas),
				yAxisIndex: 0
			}, {
				type: 'line',
				name: dataLabels[2],
				stack: "total",
				areaStyle: {
					normal: {}
				},
				data: getLabelData(dataLabels[2], datas),
				yAxisIndex: 0
			}, {
				type: 'line',
				name: dataLabels[3],
				stack: "total",
				areaStyle: {
					normal: {}
				},
				data: getLabelData(dataLabels[3], datas),
				yAxisIndex: 0
			}, {
				type: 'line',
				name: dataLabels[4],
				stack: "total",
				areaStyle: {
					normal: {}
				},
				data: getLabelData(dataLabels[4], datas),
				yAxisIndex: 0
			}, {
				type: 'line',
				name: dataLabels[5],
				stack: "total",
				areaStyle: {
					normal: {}
				},
				data: getLabelData(dataLabels[5], datas),
				yAxisIndex: 0
			}, {
				type: 'line',
				name: dataLabels[6],
				stack: "total",
				areaStyle: {
					normal: {}
				},
				data: getLabelData(dataLabels[6], datas),
				yAxisIndex: 0
			}, {
				type: 'line',
				name: dataLabels[7],
				stack: "total",
				areaStyle: {
					normal: {}
				},
				data: getLabelData(dataLabels[7], datas),
				yAxisIndex: 0
			}, {
				type: 'line',
				name: dataLabels[8],
				stack: "total",
				areaStyle: {
					normal: {}
				},
				data: getLabelData(dataLabels[8], datas),
				yAxisIndex: 0
			}, {
				type: 'line',
				name: dataLabels[9],
				stack: "total",
				areaStyle: {
					normal: {}
				},
				data: getLabelData(dataLabels[9], datas),
				yAxisIndex: 0
			}
		]
	};

	pie.setOption(pieOption);
	line.setOption(lineOption);
	line.on("click", function(params) {
		var str = "";
		for(var i in params) {
			str += "[" + i + "]=" + params[i] + "\n";
		}
		alert(str);

		if(params.seriesType == "line") {
			var op = {
				series: [{
					data: datas[params.name]
				}]
			};
			pie.setOption(op);
			pieChartCallback();
		}

	});
};