import React from 'react';
import {connect} from 'react-redux';
import ReactHighcharts from 'react-highcharts';
import HighchartsExporting from 'highcharts-exporting';
import * as moment from 'moment';
HighchartsExporting(ReactHighcharts.Highcharts);

const getConfig = (items) => {
    return {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Hive Environment Data'
        },
        // tooltip: {
        //     headerFormat: '<b>{point.x}</b><br/>',
        //     pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        // },
        xAxis: {
            categories: Object.keys(items).map(item => moment(items[item]['published_at']).format("h:mm:ss"))
        },
        yAxis: {
          title: {
              text: 'Temperature'
          }
        },
        series: [
            {
                name: 'External Temperature',
                data: Object.keys(items).map(item => items[item]['TempExt'])
            },
            {
                name: 'Internal Temperature',
                data: Object.keys(items).map(item => items[item]['TempInt'])
            }
        ]
    }
};

let Chart = ({envData}) => {

    let config = getConfig(envData);
    return (
        <ReactHighcharts config={config}/>
    )
};

const mapStateToProps = (state) => {
    return {
        envData: state.envData
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export const App = connect(mapStateToProps, mapDispatchToProps)(Chart);