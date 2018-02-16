import React from "react";
import styles from "./login.scss";

import { Card, Form, Input, Button, Checkbox, Info } from "../../../component";

const FormItem = Form.Item;

export default class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      canvasW: 0,
      canvasH: 0
    };
    this.instance = null;
    this.setSize = this.setSize.bind(this);
    this.loadAnimation = this.loadAnimation.bind(this);
  }
  componentDidMount(){
    Info("成功了");
    window.onload = () => {
      this.setSize();
      this.loadAnimation();
    };
    window.onresize = () => {
      this.setSize();
      this.loadAnimation();
    };
  }
  setSize(){
    this.setState({
      canvasW: document.documentElement.offsetWidth,
      canvasH: document.documentElement.offsetHeight
    });
  }
  loadAnimation(){
    let POINT = 60;
    let WIDTH = document.documentElement.offsetWidth, HEIGHT = document.documentElement.offsetHeight;
    let canvas = this.instance;
    let context = canvas.getContext("2d");
    context.strokeStyle = "rgba(0,0,0,0.02)",
    context.strokeWidth = 1,
    context.fillStyle = "rgba(0,0,0,0.05)";
    let circleArr = [];

    //线条：开始xy坐标，结束xy坐标，线条透明度
    function Line (x, y, _x, _y, o) {
      this.beginX = x,
      this.beginY = y,
      this.closeX = _x,
      this.closeY = _y,
      this.o = o;
    }
    //点：圆心xy坐标，半径，每帧移动xy的距离
    function Circle (x, y, r, moveX, moveY) {
      this.x = x,
      this.y = y,
      this.r = r,
      this.moveX = moveX,
      this.moveY = moveY;
    }
    //生成max和min之间的随机数
    function num (max) {
      let min = arguments[1] || 0;
      return Math.floor(Math.random()*(max-min+1)+min);
    }
    // 绘制原点
    function drawCricle (cxt, x, y, r, moveX, moveY) {
      let circle = new Circle(x, y, r, moveX, moveY);
      cxt.beginPath();
      cxt.arc(circle.x, circle.y, circle.r, 0, 2*Math.PI);
      cxt.closePath();
      cxt.fill();
      return circle;
    }
    //绘制线条
    function drawLine (cxt, x, y, _x, _y, o) {
      let line = new Line(x, y, _x, _y, o);
      cxt.beginPath();
      cxt.strokeStyle = "rgba(0,0,0,"+ o +")";
      cxt.moveTo(line.beginX, line.beginY);
      cxt.lineTo(line.closeX, line.closeY);
      cxt.closePath();
      cxt.stroke();

    }
    //初始化生成原点
    function init () {
      circleArr = [];
      for (let i = 0; i < POINT; i++) {
        circleArr.push(drawCricle(context, num(WIDTH), num(HEIGHT), num(15, 2), num(10, -10)/40, num(10, -10)/40));
      }
      draw();
    }

    //每帧绘制
    function draw () {
      context.clearRect(0,0,canvas.width, canvas.height);
      for (let i = 0; i < POINT; i++) {
        drawCricle(context, circleArr[i].x, circleArr[i].y, circleArr[i].r);
      }
      for (let i = 0; i < POINT; i++) {
        for (let j = 0; j < POINT; j++) {
          if (i + j < POINT) {
            let A = Math.abs(circleArr[i+j].x - circleArr[i].x),
              B = Math.abs(circleArr[i+j].y - circleArr[i].y);
            let lineLength = Math.sqrt(A*A + B*B);
            let C = 1/lineLength*7-0.009;
            let lineOpacity = C > 0.03 ? 0.03 : C;
            if (lineOpacity > 0) {
              drawLine(context, circleArr[i].x, circleArr[i].y, circleArr[i+j].x, circleArr[i+j].y, lineOpacity);
            }
          }
        }
      }
    }

    //调用执行
    function fn(){
      requestAnimationFrame(function () {
        for (let i = 0; i < POINT; i++) {
          let cir = circleArr[i];
          cir.x += cir.moveX;
          cir.y += cir.moveY;
          if (cir.x > WIDTH) cir.x = 0;
          else if (cir.x < 0) cir.x = WIDTH;
          if (cir.y > HEIGHT) cir.y = 0;
          else if (cir.y < 0) cir.y = HEIGHT;
        }
        draw();
        fn();
      });
    }
    init();
    fn();
  }
  render(){
    const { canvasW, canvasH } = this.state;
    return(
      <div className={styles["login-box"]}>
        <div className={styles["login-bg"]}>
          <canvas ref={instance => this.instance = instance} width={canvasW+"px"} height={canvasH+"px"}></canvas>
        </div>
        <Card className={styles["login-inner"]}>
          <Form>
            <FormItem>
              <Input prefix="user-o" placeholder="请输入登录名称" />
            </FormItem>
            <FormItem>
              <Input type="password" prefix="lock" placeholder="请输入密码" />
            </FormItem>
            <FormItem>
              <div className={styles["login-option"]}>
                <Checkbox label="记住密码" />
                <a href="javascript:void(0);">忘记密码</a>
              </div>
            </FormItem>
            <FormItem>
              <Button className={styles["login-btn"]} type="primary">登录</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}