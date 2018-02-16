import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Button from "../button/button";

import cls from "./modal.scss";

const modalRoot = document.body;

const modalBodyStyle = {
  borderBottomLeftRadius: "5px",
  borderBottomRightRadius: "5px",
};

export default class Modal extends React.Component{
  constructor(props){
    super(props);
    this.setModal = this.setModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onOk = this.onOk.bind(this);
    this.el = document.createElement("div");
    this.state = {
      display: "none",
      isOpen: false,
    };
  }
  setModal(){
    const { title, children, footer, closeModal } = this.props;
    const { display, isOpen, onOk } = this.state;
    return (
      <div 
        style={this.props.style ? {...this.props.style, display} : {display}}
        className={cls["modal-mask"]+` ${!isOpen ? cls["modal-mask-hide"] : ""}`}
      >
        <div className={cls["modal-box"]+` ${!isOpen ? cls["modal-box-hide"] : ""}`}>
          <div className={cls["modal-header"]}>
            <p className={cls["modal-header-title"]}>{title}</p>
            <span onClick={() => closeModal()} className={cls["modal-header-close"]}>
              <i class="fa fa-close"></i>
            </span>
          </div>
          <div 
            style={footer === null ? modalBodyStyle : null}
            className={cls["modal-body"]}>
            {
              React.Children.map(children, (child, index) => {
                return child;
              })
            }
          </div>
          {
            footer === null ? null : (
              footer ? footer :
                <div className={cls["modal-footer"]}>
                  <Button onClick={() => closeModal()} type="warning">取消</Button>
                  <Button onClick={() => onOk()} type="primary">确定</Button>
                </div>
            )
          }
        </div>
      </div>
    );
  }
  openModal(){ // 打开弹窗的回调
    if(this.props.openModal){
      this.props.openModal();
    }
  }
  closeModal(){ // 关闭弹窗的回调
    if(this.props.closeModal){
      this.props.closeModal();
    }
  }
  toggle(props){ // 打开关闭
    const { isOpen = false } = props;
    if(isOpen){
      this.setState({ display: "block" }, () => {
        setTimeout( () => this.setState({ isOpen }), 200 );
      });
    }else{
      this.setState({ isOpen }, () => {
        setTimeout( () => this.setState({ display: "none" }), 300 );
      });
    }
  }
  onOk(){

  }
  componentWillMount(){
    this.toggle(this.props);
  }
  componentDidMount(){
    modalRoot.appendChild(this.el);
  }
  componentWillReceiveProps(props){
    this.toggle(props);
  }
  componentWillUnmount(){
    modalRoot.removeChild(this.el);
  }
  render(){
    return ReactDOM.createPortal(
      this.setModal(),
      this.el
    );
  }
}

Modal.PropTypes = {
  isOpen: PropTypes.bool,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
};

Modal.defaultProps = {
  title: "",
};