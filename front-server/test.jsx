import React from "react";

import Button from "../component/button/button";
import Select from "../component/select/select";
import Modal from "../component/modal/modal";

const selectData = [
  {text: "测试1", value: "1", other: "其他数据"},
  {text: "测试2", value: "2", other: "其他数据"},
  {text: "测试3", value: "3", other: "其他数据"},
  {text: "测试4", value: "4", other: "其他数据"},
  {text: "测试5", value: "5", other: "其他数据"},
  {text: "测试6", value: "6", other: "其他数据"},
  {text: "测试7", value: "7", other: "其他数据"},
  {text: "测试8", value: "8", other: "其他数据"},
  {text: "测试9", value: "9", other: "其他数据"},
  {text: "测试10", value: "10", other: "其他数据"},
];

export default class Test extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onOk = this.onOk.bind(this);
  }
  openModal(){
    this.setState({ isOpen: true });
  }
  closeModal(){
    this.setState({ isOpen: false });
  }
  onOk(){

  }
  render(){
    return (
      <div>
        <Button onClick={this.openModal}>测试弹窗</Button>
        <Modal 
          closeModal={this.closeModal} 
          isOpen={this.state.isOpen} 
          title="弹窗测试"
          onOk={this.onOk}
        >
          <div style={{width: "150px"}}>
            <Select data={selectData} defaultValue={"3"} />
          </div>
        </Modal>
      </div>
    );
  }
}