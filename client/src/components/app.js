import React from 'react';
import {connect} from 'react-redux';
import ReactHighcharts from 'react-highcharts';
import HighchartsExporting from 'highcharts-exporting';
import * as moment from 'moment';
HighchartsExporting(ReactHighcharts.Highcharts);

const getConfig = (items) => {
    return {
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: 'Hive Environment Data'
        },
        xAxis: {
            title: {
                text: 'Time'
            },
            categories: Object.keys(items).map(item => moment(items[item]['published_at']).format("h:mm:ss")),
            crosshair: true
        },
        yAxis: [
            // 0
            {
                labels: {
                    format: '{value}°F'
                },
                title: {
                    text: 'Temperature'
                }
            },
            // 1
            {
                labels: {
                    format: '{value}hPa'
                },
                title: {
                    text: 'Pressure'
                }
            },
            // 2
            {
                labels: {
                    format: '{value}%'
                },
                title: {
                    text: 'Humidity'
                },
                opposite: true
            },
            // 3
            {
                labels: {
                    format: '{value}m'
                },
                title: {
                    text: 'Altitude'
                },
                opposite: true
            }
        ],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 225,
            verticalAlign: 'top',
            y: 0,
            floating: true,
            backgroundColor: '#FFFFFF'
        },
        series: [
            {
                name: 'Altitude',
                type: 'column',
                yAxis: 3,
                data: Object.keys(items).map(item => items[item]['AltitudeExt']),
                tooltip: {
                    valueSuffix: 'm'
                },
                color: '#ffc688'
            },
            {
                name: 'External Temperature',
                type: 'spline',
                yAxis: 0,
                data: Object.keys(items).map(item => items[item]['TempExt']),
                tooltip: {
                    valueSuffix: '°F'
                }
            },
            {
                name: 'External Pressure',
                type: 'spline',
                yAxis: 1,
                data: Object.keys(items).map(item => items[item]['PressureExt']),
                marker: {
                    enabled: false
                },
                dashStyle: 'shortdot',
                tooltip: {
                    valueSuffix: 'hPa'
                }
            },
            {
                name: 'External Humidity',
                type: 'spline',
                yAxis: 2,
                data: Object.keys(items).map(item => items[item]['HumidityExt']),
                tooltip: {
                    valueSuffix: '%'
                }
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