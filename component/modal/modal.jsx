import React from "react";
import ReactDOM from "react-dom";
import Button from "../button/button";

import styles from "./modal.scss";

const modalRoot = document.body;

export default class Modal extends React.Component{
  constructor(props){
    super(props);
    this.setModal = this.setModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.el = document.createElement("div");
    this.state = {
      isOpen: true,
    };
  }
  setModal(){
    const { title, children, footer } = this.props;
    const { isOpen } = this.state;
    return <div className={styles["modal-mask"]+` ${!isOpen ? styles["modal-hide"] : ""}`}>
      <div className={styles["modal-box"]+` ${!isOpen ? styles["modal-box-hide"] : ""}`}>
        <div className={styles["modal-header"]}>
          <p className={styles["modal-header-title"]}>{title}</p>
          <span onClick={this.closeModal} className={styles["modal-header-close"]}>
            <i class="fa fa-close"></i>
          </span>
        </div>
        <div className={styles["modal-body"]}>{children}</div>
        {
          (footer && footer != null) ? footer :
            <div className={styles["modal-footer"]}>
              <Button onClick={this.closeModal} type="warning">取消</Button>
              <Button type="primary">确定</Button>
            </div>
        }
      </div>
    </div>;
  }
  openModal(){

  }
  closeModal(){
    this.setState({ isOpen: false });
  }
  componentDidMount(){
    modalRoot.appendChild(this.el);
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

Modal.defaultProps = {
  title: ""
};