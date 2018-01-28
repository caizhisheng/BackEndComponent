import React from "react";

import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/pie";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";

export default class SmallPie extends React.Component{
  constructor(props){
    super(props);
    this.smallPie = null;
    this.charts = null;
    this.setOption = this.setOption.bind(this);
  }
  componentDidMount(){
    const { data } = this.props;
    this.charts = echarts.init(this.smallPie);
    let options = this.setOption(data, "#29e");
    this.charts.setOption(options);
  }
  componentDidUpdate(){
    const { data } = this.props;
    this.charts = echarts.init(this.smallPie);
    let options = this.setOption(data, "#29e");
    this.charts.setOption(options);
  }
  componentWillUnmount(){
    this.charts.dispose();
  }
  setOption(data, color){
    const dataStyle = {
      normal: {
        label: { show: false },
        labelLine: { show: false },
        shadowBlur: 40,
        shadowColor: "rgba(40, 40, 40, 0.5)",
      }
    };
  
    const placeHolderStyle = {
      normal: {
        color: "rgba(44,59,70,1)", // 未完成的圆环的颜色
        label: { show: false },
        labelLine: { show: false }
      },
      emphasis: {
        color: "rgba(44,59,70,1)" // 未完成的圆环的颜色
      }
    };
    return {
      title: {
        text: data.complete+"%",
        x: "center",
        y: "center",
        textStyle: {
          fontWeight: "normal",
          color: "#b697cd",
          fontSize: 14
        }
      },
      tooltip: { show: false, },
      toolbox: { show: false, },
      series: [{
        name: "Pie1",
        type: "pie",
        clockWise: false,
        radius: [21, 25],
        itemStyle: dataStyle,
        hoverAnimation: false,
        data: [{
          value: data.notComplete,
          name: "invisible",
          itemStyle: placeHolderStyle,
        }, {
          value: data.complete,
          itemStyle: {
            normal: {
              color: color,
              shadowColor: "#b697cd",
              shadowBlur: 10
            }
          }
        }]
      }]
    };
  }
  render(){
    return <div style={{width: "64px", height: "64px"}} ref={instance => this.smallPie = instance}></div>;
  }
}