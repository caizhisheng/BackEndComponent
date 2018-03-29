import React from "react";
import ReactDOM from "react-dom";
import cls from "./info.scss";

const transitionTime = 500;
let list = [];
let container = null;

function createContainer(){ // 创建容器
  const wrap = document.createElement("div");
  const div = document.createElement("div");
  wrap.appendChild(div);
  document.body.appendChild(wrap);
  container = div;
}

class InfoContent extends React.Component{
  constructor(props){
    super(props);
    this.startTimer = null;
    this.closeTimer = null;
    this.duration = props.duration;
    this.state = {
      styles: {},
      list: []
    };
    this.closeInfo = this.closeInfo.bind(this);
  }
  componentWillUnmount(){
    list.unshift();
  }
  render(){
    const { label, icon, type, className = null, data } = this.props;
    return(
      data.map(() => {
        return <div className={`${cls["info-wrap"]} ${className || ""}`}>
          <div style={this.state.styles} className={cls["info-box"]+" "+cls[`info-box-${type}`]}>
            <i className={`iconfont icon-${icon}`}></i>
            <div>{label}</div>
          </div>
        </div>;
      })
    );
  }
}

InfoContent.defaultProps = {
  "duration": 2000
};

InfoContent.getInstance = function(props){
  let styles = {
    "top": "24px", 
    "opacity": 1,
  };
  if(props.style){
    styles = { ...styles, ...props.style };
  }
  list.push({props, styles});
  return <InfoContent data={list} {...props} styles={styles} />;
};

function addContent(props){ // 添加提示
  if(typeof props.duration === "function"){
    props.callback = props.duration;
    delete props.duration;
  }
  const content = InfoContent.getInstance(props);
  if(!container){
    createContainer();
  }
  ReactDOM.render(
    content,
    container
  );
}

/* function removeContent(props){ // 移除提示
  const { callback = null } = props;
  setTimeout(() => {
    ReactDOM.unmountComponentAtNode(container);
    if(callback) callback();
  }, transitionTime);
} */

createContainer();

/* 
 * label: 提示内容
 * duration: 关闭时间
 * callback：回调函数
 */

export default function Info(label, duration, callback){
  addContent({label, icon:"info", type:"default", duration, callback});
}

Info.success = function(label, duration, callback){
  addContent({label, icon:"roundcheck", type:"success", duration, callback});
};
Info.fail = function(label, duration, callback){
  addContent({label, icon:"roundclose", type:"fail", duration, callback});
};
Info.warning = function(label, duration, callback){
  addContent({label, icon:"question", type:"warning", duration, callback});
};
Info.destory = function(callback){
  // removeContent();
  if(callback) callback();
};