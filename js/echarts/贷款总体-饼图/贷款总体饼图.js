option = {
    title : {
        text: '大学生贷款总体情况',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['正常','关注','次级','可疑','损失','不良']
    },
    series : [
        {
            name: '贷款额',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:2335, name:'正常'},
                {value:310, name:'关注'},
                {value:234, name:'次级'},
                {value:135, name:'可疑'},
                {value:148, name:'损失'},
                {value:48, name:'不良'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};


option = {
    title : {
        text: '大学生消费总体情况',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['现金消费','贷款消费']
    },
    series : [
        {
            name: '金额',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'现金消费'},
                {value:310, name:'贷款消费'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};


option = {
    baseOption:{
        timeline:{
            // data:['']
            show: false,
            autoPlay: true,
            axisType: 'category',
            rewind: true,
            loop: true
        },
        title: {
            text: '大学生购物消费日趋势'
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },

        calculable : true,
    // legend: {
    //     data:['现金消费','贷款消费','商铺']
    // },

        xAxis : [
            {
                type : 'category',
                // nameLocation: 'middle',
                // boundaryGap : false,
                axisLabel:{
                    // areaStyle:{
                    //     width: 20
                    // }
                },
                data : ['2016-10-01','2016-10-02','2016-10-03','2016-10-04','2016-10-05','2016-10-06','2016-10-07']
            }
        ],
        yAxis : [
            {
                name: '金额',
                type : 'value',
                position: 'left'
            }
        ],
        series : [
            {
                name:'现金消费',
                type:'line',
                // yAxisIndex:0
                // stack: '总量',
                // areaStyle: {normal: {}},
                data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
                name:'贷款消费',
                type:'line',
                // yAxisIndex:0,
                // stack: '总量',
                // areaStyle: {normal: {}},
                data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
                name:'商铺',
                type:'pie',
                center: ['75%', '35%'],
                radius: '28%'
                // data:[{
                //     name: '商户A',
                //     value: 100
                // },{
                //     name: '商户B',
                //     value: 100
                // },{
                //     name: '商户C',
                //     value: 100
                // }]
            }
        ]
    },
    options:[
        {
            title:{text:'aa'},
            series:
            [
                {data: [220, 182, 191, 234, 290, 330, 310]},
                {data: [220, 182, 191, 234, 290, 330, 310]},
                {data: [
                    {name:'AA', value:100},
                    {name:'bb', value:100},
                    {name:'cc', value:100}]}
            ]
        },
        {
            title:{text:'bb'},
            series:
            [
                {data: [220, 182, 191, 234, 290, 330, 310]},
                {data: [220, 182, 191, 234, 290, 330, 310]},
                {data: [
                    {name:'AA', value:200},
                    {name:'bb', value:300},
                    {name:'cc', value:100}]}
            ]
        },
        {
            title:{text:'cc'},
            series:
            [
                {data: [220, 182, 191, 234, 290, 330, 310]},
                {data: [220, 182, 191, 234, 290, 330, 310]},
                {data: [
                    {name:'AA', value:100},
                    {name:'bb', value:300},
                    {name:'cc', value:100}]}
            ]
        },
        {
            title:{text:'dd'},
            series:
            [
                {data: [220, 182, 191, 234, 290, 330, 310]},
                {data: [220, 182, 191, 234, 290, 330, 310]},
                {data: [
                    {name:'AA', value:200},
                    {name:'bb', value:300},
                    {name:'cc', value:400}]}
            ]
        }
    ]
};
