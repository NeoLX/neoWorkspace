var mapChartCreator = function(elementName, names, data){
    
	var dom = document.getElementById(elementName);
	var myChart = echarts.init(dom);

    var option = {
        visualMap: {
            min: 0,
            max: 10000,
            left: 'left',
            top: 'bottom',
            text: ['高','低'],           // 文本，默认为数值文本
            calculable: true
        },
        series : [
            {
                name: 'GDP占比',
                type: 'map',
                mapType: 'china',
                //center: ['50%', '50%'],
                left: '30%',
                top: '00%',
                zoom: 0.5,
                itemStyle:{
                    opacity: '0.1'
                }
            }
        ]
     };

     myChart.setOption(option, true);
}