import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

class App2 extends Component {
    componentDidMount(){
        let chart = am4core.create("chartdiv2", am4charts.XYChart);
        am4core.useTheme(am4themes_animated);
        chart.data = this.generatechartData();
        console.log('chart data',chart.data);
        this.chart = chart;
        this.createAxes();
        this.createValueAxis();
        this.createSeries();
        this.createRange();
        this.addCursor();
    }
    generatechartData = () => {
        var chartData = [];
        var firstDate = new Date();
        // firstDate.setDate( firstDate.getDate() - 150 );
        var visits = -40;
        var b = 0.6;
        for ( var i = 0; i < 180; i++ ) {
            // we create date objects here. In your data, you can have date strings
            // and then set format of your dates using chart.dataDateFormat property,
            // however when possible, use date objects, as this will speed up chart rendering.
            var newDate = new Date( firstDate );
            newDate.setMinutes( newDate.getDate() + i );
            if(i > 80){
                b = 0.4;
            }
            visits += Math.round((Math.random()<b?1:-1)*Math.random()*10);
        
            chartData.push( {
                date: newDate,
                visits: visits
            } );
        }
        return chartData;
    }
    createAxes = () => {
        // Create axes
        var dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
        // dateAxis.startLocation = 0.5;
        // dateAxis.endLocation = 0.5;
        dateAxis.renderer.grid.template.location = 0.5;
        dateAxis.baseInterval = {
            "timeUnit": "minute",
            "count": 1
        } 
        this.dateAxis = dateAxis;
    }
    createValueAxis = () => {
        var valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
        this.valueAxis = valueAxis;
    }
    createSeries = () => {
        var series = this.chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "visits";
        series.dataFields.dateX = "date";
        series.strokeWidth = 3;
        series.tooltipText = "{valueY.value}";
        // series.fillOpacity = 0.1;
        this.series = series;
    }
    createRange = () => {
        var range = this.valueAxis.createSeriesRange(this.series);
        range.value = 0;
        range.endValue = -1000;
        // range.contents.stroke = this.chart.colors.getIndex(4);
        range.contents.stroke = "red";
        range.contents.fill = range.contents.stroke;
        range.contents.strokeOpacity = 0.7;
        // range.contents.fillOpacity = 0.1;
    }
    addCursor = () => {
        this.chart.cursor = new am4charts.XYCursor();
        this.chart.cursor.xAxis = this.dateAxis;
        this.chart.scrollbarX = new am4core.Scrollbar();
        this.chart.cursor.behavior = 'none';
    }
    render(){
        return(
            <div id="chartdiv2" style={{ width: "100%", height: "500px" }}></div>
        )
    }
};
export default App2;