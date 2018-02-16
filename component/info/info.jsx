import React from "react";
import ReactDOM from "react-dom";
import cls from "./info.scss";

let list = [];
let container = null;

function createContainer(){ // 创建容器
  const div = document.createElement("div");
  const wrap = document.createElement("div");
  wrap.appendChild(div);
  document.body.appendChild(wrap);
  container = div;
}

class InfoContent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      styles: {}
    };
  }
  componentDidMount(){
    const { styles } = this.props;
    setTimeout(() => {
      this.setState({
        styles
      });
    }, 500);
  }
  render(){
    const { label, icon, type } = this.props;
    return(
      <div className={cls["info-wrap"]}>
        <div style={this.state.styles} className={cls["info-box"]+" "+cls[`info-box-${type}`]}>
          <i className={`iconfont icon-${icon}`}></i>
          <div>{label}</div>
        </div>
      </div>
    );
  }
}

InfoContent.getInstance = function(props, styles){
  return <InfoContent {...props} styles={{top: "24px", "opacity": 1, ...styles}} />;
};

function addContent(duration, callback){ // 添加提示
  const content = InfoContent.getInstance(list.shift());
  if(!container){
    createContainer();
  }
  ReactDOM.render(
    content,
    container
  );
}

/* function removeContent(args){ // 移除提示
  let { instance, duration = 2000, callback } = args;
  if(typeof duration === "function"){
    callback = duration;
    duration = 2000;
  }
  setTimeout(() => {

  }, duration+1000);
} */

createContainer();

/* 
 * label: 提示内容
 * duration: 关闭时间
 * callback：回调函数
 */

export default function Info(label, duration, callback){
  list.push({label, icon:"info", type:"default"});
  addContent(duration, callback);
}

Info.success = function(label, duration, callback){
  list.push({label, icon:"roundcheck", type:"success"});
  addContent(duration, callback);
};
Info.fail = function(label, duration, callback){
  list.push({label, icon:"roundclose", type:"fail"});
  addContent(duration, callback);
};
Info.warning = function(label, duration, callback){
  list.push({label, icon:"question", type:"warning"});
  addContent(duration, callback);
};