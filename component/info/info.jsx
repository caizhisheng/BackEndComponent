import React from "react";
import ReactDOM from "react-dom";
import cls from "./info.scss";

const transitionTime = 500;
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
      styles: {}
    };
    this.closeInfo = this.closeInfo.bind(this);
  }
  componentDidMount(){
    const { styles } = this.props;
    clearTimeout(this.startTimer);
    this.startTimer = setTimeout(() => {
      this.setState({
        styles
      }, () => {
        this.startTimer = null;
        this.closeInfo();
      });
    }, 100);
  }
  closeInfo(){
    let styles = {
      ...this.props.styles,
      "top": 0,
      "opacity": 0
    };
    clearTimeout(this.closeTimer);
    this.closeTimer = setTimeout(() => {
      this.setState({ styles }, () => {
        this.closeTimer = null;
        removeContent(this.props);
      });
    }, this.duration);
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

InfoContent.defaultProps = {
  "duration": 2000
};

InfoContent.getInstance = function(props){
  let styles = {
    "top": "24px", 
    "opacity": 1,
  };
  if(props.styles){
    styles = {
      ...styles,
      ...props.styles
    };
  }
  return <InfoContent {...props} styles={styles} />;
};

function addContent(props){ // 添加提示
  console.log(props);
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

function removeContent(props){ // 移除提示
  const { callback = null } = props;
  setTimeout(() => {
    ReactDOM.unmountComponentAtNode(container);
    if(callback) callback();
  }, transitionTime);
}

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