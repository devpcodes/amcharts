import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import "./app.scss";
am4core.useTheme(am4themes_animated);

setTimeout(() => {
    import('./utils/jquery-3.3.1.min.js').then((module)=>{
        const $ = module.default;
        alert($('#chartdiv').width());
    })
}, 5000);

class App extends Component {
    state = {
        data:[{
        "country": "Lithuania",
        "litres": 501.9,
        "units": 250000
      }, {
        "country": "Czech Republic",
        "litres": 301.9,
        "units": 222000
      }, {
        "country": "Ireland",
        "litres": 201.1,
        "units": 170000
      }, {
        "country": "Germany",
        "litres": 165.8,
        "units": 122000
      }, {
        "country": "Australia",
        "litres": 139.9,
        "units": 99000
      }, {
        "country": "Austria",
        "litres": 128.3,
        "units": 85000
      }, {
        "country": "UK",
        "litres": 99,
        "units": 93000
      }, {
        "country": "Belgium",
        "litres": 60,
        "units": 50000
      }, {
        "country": "The Netherlands",
        "litres": 50,
        "units": 42000
      }]
    }
    componentDidMount() {
        let chart = am4core.create("chartdiv", am4charts.XYChart);
    
        // ... chart code goes here ...
        chart.data = this.state.data;
        this.chart = chart;
        // Create axes
        this.createX();
        this.createY();
        this.createY2();

        this.createColumn(); //長條圖
        this.createLine(); // 折線圖

        this.legend(); //增加下方說明

        this.addCursor();
    }
    createX = () => {
        var categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "country";
        categoryAxis.title.text = "Countries";
        categoryAxis.renderer.grid.template.location = 0.5;//x軸格線位置 0~1


        //設置x軸光標背景色
        var seriesTooltip = categoryAxis.tooltip;
        seriesTooltip.background.fill = am4core.color("red"); 
    }

    createY = () => {
        // First value axis
        var valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Litres sold (M)";
        this.valueAxis = valueAxis;
    }

    createY2 = () => {
        var valueAxis2 = this.chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis2.title.text = "Units sold";
        valueAxis2.renderer.opposite = true;//對稱顯示

        this.valueAxis2 = valueAxis2;
    }

    createColumn = () => {
        // First series
        var series = this.chart.series.push(new am4charts.ColumnSeries());//長條圖
        series.dataFields.valueY = "litres";
        series.dataFields.categoryX = "country";
        series.name = "Sales";
        // series.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        // series.tooltipText = `[bold]YEAR {categoryX}[/]
        // ----
        // litres: {litres}
        // units: {units}`;

        series.tooltip.label.interactionsEnabled = true;
        // series.tooltip.pointerOrientation = "vertical";//垂直顯示
        series.tooltipHTML = `<center style="background-color: white"><strong>YEAR {categoryX}</strong></center>
        <hr />
        <table>
        <tr>
          <th align="left">Cars</th>
          <td style="color:red">{litres}</td>
        </tr>
        <tr>
          <th align="left">Motorcycles</th>
          <td>{units}</td>
        </tr>
        </table>
        <hr />
        <center><input type="button" value="More info" onclick="alert('You clicked on {categoryX}')" /></center>`;

        //tooltip設定屬性
        series.tooltip.background.strokeWidth = 1;
        series.tooltip.background.cornerRadius = 3;
        series.tooltip.background.pointerLength = 10;
        series.tooltip.dx = 20
        // series.tooltip.dy = 100;
    }

    createLine = () => {
        var series2 = this.chart.series.push(new am4charts.LineSeries());//折線圖
        series2.dataFields.valueY = "units";
        series2.dataFields.categoryX = "country";
        series2.name = "Units";
        series2.tooltipText = "{name}: [bold]{valueY}[/]";
        series2.strokeWidth = 2; //線段粗細
        series2.yAxis = this.valueAxis2;
    }

    legend = () => {
        // Add legend
        this.chart.legend = new am4charts.Legend();  //圖表最下方的說明
    }

    addCursor = () => {
        // Add cursor
        this.chart.cursor = new am4charts.XYCursor(); //tooltip
        this.chart.cursor.lineY.disabled = true;
        this.chart.cursor.behavior = "zoomX";//在圖表中移動滑鼠會縮放，可設為"none"
        this.chart.cursor.lineX.stroke = am4core.color("#8F3985");
        this.chart.cursor.lineX.strokeWidth = 4;
        this.chart.cursor.lineX.strokeOpacity = 0.2;
        // this.chart.cursor.lineX.strokeDasharray = "";
    }
  
    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }
  
    render() {
        return (
            <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
        );
    }
}

export default App;