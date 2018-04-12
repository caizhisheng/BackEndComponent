import React from "react";
import ReactDOM from "react-dom";
// import cls from "./info.scss";

let container = null;
const createContainer = () => {
  container = document.createElement("div");
  document.body.appendChild(container);
};
createContainer();

let uuid = 0;
let newInstance = null;
class Notice extends React.Component{
  state = {
    list: []
  };
  add=(props)=>{
    const { label } = props.data;
    let { list } = this.state;
    uuid++;
    list.push({ label, uuid });
    this.setState({ list });
  }
  remove=()=>{
    let { list } = this.state;
    list.unshift();
    this.setState({ list });
  }
  destory=()=>{
    let { list } = this.state;
    list.length = 0;
    this.setState({ list });
  }
  render(){
    const { list } = this.state;
    return(
      <div className="notice-box">
        {
          list.length === 0 ? null :
            list.map(item => {
              const { label, uuid } = item;
              return <div key={uuid}>{label}</div>;
            })
        }
      </div>
    );
  }
}

Notice.getInstance = function({label, icon, type, duration}, callback){
  if(!container) createContainer();
  if(newInstance){
    console.log(newInstance);
    return;
  }
  function ref(instance){
    newInstance = instance;
  }
  ReactDOM.render(<Notice ref={ref} />, container);
}

function addContent({label, icon, type, duration, callback}){
  if(typeof duration === "function"){
    callback = duration;
    duration = 3000;
  }
  Notice.getInstance({label, icon, type, duration, callback});
}

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
  if(callback) callback();
};