import React from "react";
import Input from "../input/input";
import styles from "./timepicker.scss";

export default class Timepicker extends React.Component {
  constructor(props) {
    super(props);
    this.defaultH = 30;
    this.hourEle = null;
    this.minuteEle = null;
    this.secondEle = null;
    this.reg = /^((([0-1][0-9])|([2][0-3])):[0-5][0-9]:[0-5][0-9])$/g;
    this.state = {
      hourList: [],
      minuteList: [],
      secondList: [],
      value: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.setInputTime = this.setInputTime.bind(this);
    this.findNoDiable = this.findNoDiable.bind(this);
  }
  getHour(hour) {
    let time = 24, arr = [];
    if (hour && hour.disabled) return;
    for (let i = 0; i < time; i++) {
      let getHour = i < 10 ? "0" + i : i,
        selected = false, disabled = false;
      if (hour && +hour.value === +getHour) selected = true;
      arr.push({ selected, disabled, value: getHour });
    }
    this.setState({
      hourList: arr
    }, () => {
      if (hour) {
        this.animate("hour", +hour.value);
        this.setInputTime("hour", hour.value);
      }
    });
  }
  getMinute(minute) {
    let time = 60, arr = [];
    if (minute && minute.disabled) return;
    for (let i = 0; i < time; i++) {
      let getMinute = i < 10 ? "0" + i : i,
        selected = false, disabled = false;
      if (minute && +minute.value === +getMinute) selected = true;
      arr.push({ selected, disabled, value: getMinute });
    }
    this.setState({
      minuteList: arr
    }, () => {
      if (minute) {
        this.animate("minute", +minute.value);
        this.setInputTime("minute", minute.value);
      }
    });
  }
  getSecond(second) {
    let time = 60, arr = [];
    if (second && second.disabled) return;
    for (let i = 0; i < time; i++) {
      let getSecond = i < 10 ? "0" + i : i,
        selected = false, disabled = false;
      if (second && +second.value === +getSecond) selected = true;
      arr.push({ selected, disabled, value: getSecond });
    }
    this.setState({
      secondList: arr
    }, () => {
      if (second) {
        this.animate("second", +second.value);
        this.setInputTime("second", second.value);
      }
    });
  }
  animate(type, value) {
    const requestAnimationFrame = window.requestAnimationFrame;
    let element = this[type + "Ele"];
    let scrollTop = element.scrollTop;
    let targetTop = value * this.defaultH; // 目标距离
    if (scrollTop === targetTop) return;
    let result = Math.abs(scrollTop - targetTop); // 计算实时变化距离
    let speed = Math.floor(result / 4.5); // 计算步进
    if (speed <= 2) speed = 1;
    requestAnimationFrame(() => {
      if (scrollTop < targetTop) {
        element.scrollTop = scrollTop + speed;
      } else if (scrollTop > targetTop) {
        element.scrollTop = scrollTop - speed;
      }
      this.animate(type, value);
    });
  }
  handleChange(e) {
    const { hourList, minuteList, secondList } = this.state;
    let value = e.target.value.trim();
    if (value.length < 8) {
      this.setState({ value });
      return;
    }
    value = value.substr(0, 8);
    if (this.reg.test(value)) {
      let hour = +value.substr(0, 2), minute = +value.substr(3, 2), second = +value.substr(6, 2);
      this.setState({ value });
      this.animate("hour", hour);
      this.animate("minute", minute);
      this.animate("second", second);
      this.getHour(hourList[hour]);
      this.getMinute(minuteList[minute]);
      this.getSecond(secondList[second]);
    } else {
      this.setState({ value: "" });
      this.animate("hour", 0);
      this.animate("minute", 0);
      this.animate("second", 0);
      this.getHour();
      this.getMinute();
      this.getSecond();
    }
  }
  setInputTime(type, time) {
    let value = this.state.value;
    if(this.reg.test(value)){
      value = value.split(":");
      let replaceIndex = type === "hour" ? 0 : type === "minute" ? 1 : 2;
      value.splice(replaceIndex, 1, time);
      value = value.join(":");
      this.setState({ value });
      return;
    }
    if(type === "hour"){
      value = time + ":" + this.findNoDiable("minute");
    }else if(type === "minute"){
      value = this.findNoDiable("hour") + ":" + time;
    }
    if(this.props.renderSecond){ // 判断是否渲染秒
      if(type === "second"){
        value = this.findNoDiable("hour") + ":" + this.findNoDiable("minute") + ":" + time;
      }else{
        value += (":"+this.findNoDiable("second"));
      }
    }
    this.setState({ value });
  }
  findNoDiable(type){
    let value, defaultValue;
    this.state[type+"List"].every(item => {
      if(!defaultValue && !item.disabled) defaultValue = item.value;
      if(!value && item.selected) value = item.value;
      return value ? false : true;
    });
    return value ? value : defaultValue;
  }
  componentWillMount() {
    this.getHour();
    this.getMinute();
    if (this.props.renderSecond) {
      this.getSecond();
    }
  }
  render() {
    const { value, hourList, minuteList, secondList } = this.state;
    const { renderSecond } = this.props;
    return (
      <div className={styles["timepicker-box"]}>
        <Input value={value} onInput={e => this.handleChange(e)} placeholder="请输入时间" nextfix="clock-o" />
        <div className={styles["timepicker-box-select"]}>
          <div ref={instance => this.hourEle = instance} className={styles["timepicker-box-hour"]}>
            <ul>
              {
                hourList.map((item, index) => {
                  return <li
                    onClick={() => this.getHour(item)}
                    className={styles[item.selected ? "time-selected" : ""]}
                    key={index}>{item.value}</li>;
                })
              }
            </ul>
          </div>
          <div ref={instance => this.minuteEle = instance} className={styles["timepicker-box-minute"]}>
            <ul>
              {
                minuteList.map((item, index) => {
                  return <li
                    onClick={() => this.getMinute(item)}
                    className={styles[item.selected ? "time-selected" : ""]}
                    key={index}>{item.value}</li>;
                })
              }
            </ul>
          </div>
          {
            renderSecond ?
              <div ref={instance => this.secondEle = instance} className={styles["timepicker-box-second"]}>
                <ul>
                  {
                    secondList.map((item, index) => {
                      return <li
                        onClick={() => this.getSecond(item)}
                        className={styles[item.selected ? "time-selected" : ""]}
                        key={index}>{item.value}</li>;
                    })
                  }
                </ul>
              </div> : null
          }
        </div>
      </div>
    );
  }
}

Timepicker.defaultProps = {
  renderSecond: true,
};