var flowView = function(dom){

	var view = echarts.init(document.getElementById(dom));
    var flowData = build();

    var monLabels = createMonLabel();

	var lineOption = {
		title: {
			text: '资金总体去向图',
			subtext: '纯属虚构',
			x: 'center'
		},
		tooltip: {
			trigger: 'item',
			backgroundColor:'rgba(50,50,50,0.3)',
			formatter: function(opts) {
				var str = opts[0].name + "<br/><ul>";
				for(var i in opts){
					str += "<li style='color:" + opts[i].color + "'><p style='color: #fff;'>" + opts[i].seriesName + ":" + Math.floor(opts[i].value * 100) / 100 + "元</p></li>";
				}
				str += "</ul>";
				return str;
			}
		},
		dataZoom: [{
			show: true,
			type: "slider",
			realtime: true,
			xAxisIndex: [0, 1]
		}],
		// legend: {
		// 	orient: 'vertical',
		// 	left: 'top',
		// 	data: legendData,
		// 	selected: initSelected(dataLabels)
		// },
		grid: [
            {
                containLabel: true,
                height: '60%'
		    },{
                containLabel: true,
                top: '75%',
                height: '20%'
		    }
        ],
        axisPointer: {
            link: {xAxisIndex: 'all'},
            label: {
                backgroundColor: '#777'
            }
        },
		xAxis: [
            {
                type: 'category',
                data: monLabels,
                boundaryGap: false,
                axisPointer: {
                    show: true,
                    type: 'line'
                },
                splitNumber: 20,
                scale: true,
		    },{
                type: 'category',
                gridIndex: 1,
                axisLine: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                axisPointer: {
                    show: true,
                    type: 'shadow'
                },
                data: monLabels,
                splitNumber: 20,
                scale: true,
		    }
        ],
		yAxis: [
            {
				name: "金额",
				type: 'value',
				position: 'left'
			},{
				name: "笔数",
                gridIndex: 1,
				type: 'value',
				position: 'left'
			}
		],
		series: [
            {
				type: 'line',
				name: titles.drAmount,
                areaStyle: {
								normal: {}
							},
				tooltip: {
					formatter: function(opts) {
						return Math.floor(opts.value * 100) / 100 + "元";
					}
				},
                itemStyle:{
                    normal:{
                        color: colors.drAmount,
                        opacity: 0.7
                    }
                },
				data: getTotalLevelData("drAmount")
			},{
				type: 'line',
				name: titles.crAmount,
                areaStyle: {
								normal: {}
							},
				tooltip: {
					formatter: function(opts) {
						return Math.floor(opts.value * 100) / 100 + "元";
					}
				},
                itemStyle:{
                    normal:{
                        color: colors.crAmount,
                        opacity: 0.7
                    }
                },
				data: getTotalLevelData("crAmount")
			},{
				type: 'line',
				name: titles.diff,
				tooltip: {
					formatter: function(opts) {
						return Math.floor(opts.value * 100) / 100 + "元";
					}
				},
                itemStyle:{
                    normal:{
                        color: colors.diff
                    }
                },
				data: getTotalLevelData("diff")
			},{
				type: 'bar',
				name: titles.drCount,
				tooltip: {
					formatter: function(opts) {
						return opts.seriesName + ":" + opts.value + "笔";
					}
				},
				data: getTotalLevelData("drCount"),
                itemStyle:{
                    normal:{
                        opacity: 0.7,
                        color: colors.drCount
                    }
                },
                xAxisIndex:1,
                yAxisIndex:1
			},{
				type: 'bar',
				name: titles.crCount,
				tooltip: {
					formatter: function(opts) {
						return opts.seriesName + ":" + opts.value + "笔";
					}
				},
				data: getTotalLevelData("crCount"),
                itemStyle:{
                    normal:{
                        opacity: 0.7,
                        color: colors.crCount
                    }
                },
                xAxisIndex:1,
                yAxisIndex:1
			}
		]
	};

    view.setOption(lineOption);
}