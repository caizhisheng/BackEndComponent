import React from "react";
import styles from "./select.scss";

export default class Select extends React.Component {
  constructor(props) {
    super(props);
    this.preItemIndex = "";
    this.toggle = this.toggle.bind(this);
    this.onClick = this.onClick.bind(this);
    this.setShow = this.setShow.bind(this);
    this.state = {
      isOpen: false,
      showText: "",
    };
  }
  componentWillMount() {
    const { data } = this.props;
    data.forEach(item => {
      item.disabled = false;
      item.selected = false;
    });
    this.setState({ data });
  }
  componentDidMount(){
    this.setShow();
  }
  setShow(selectItem) { // 设置展示值
    const { data, defaultValue = "" } = this.props;
    let showText = "";
    if (selectItem && selectItem.disabled) return;
    
    if(this.preItemIndex !== ""){
      if (data[this.preItemIndex] === selectItem) return;
      data[this.preItemIndex].selected = false;
    }

    let selectIndex = data.indexOf(selectItem);
    if (selectItem && selectIndex != null && selectIndex > -1) { // 有选中
      data[selectIndex].selected = true;
      showText = data[selectIndex].text;
    } else { // 没有选中
      data.every((item, index) => { // 查找默认值
        if (item.value === defaultValue){
          selectIndex = index;
          item.selected = true;
          showText = item.text;
        }
        return showText !== "" ? false : true;
      });
    }
    if(this.props.onChange && selectItem){
      this.props.onChange(selectItem);
    }
    this.setState({ showText, data }, () => {
      this.preItemIndex = (selectIndex != null && selectIndex !== -1) ? selectIndex : "";
    });
  }
  toggle() {
    let { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen
    });
  }
  onClick(item) {
    if (this.props.onClick) {
      this.props.onClick(item);
    }
    this.toggle();
    this.setShow(item);
  }
  render() {
    const props = this.props;
    const { isOpen, showText } = this.state;
    return (
      <div className={styles["select-box"]}>
        <div className={styles["select-show"]} onClick={this.toggle}>
          <span className={styles["select-show-title"]}>{showText}</span>
          <span className={`fa fa-angle-down ${styles["select-show-icon"]}`}></span>
        </div>
        <ul className={styles["select-menu"] + ` ${isOpen ? styles["select-menu-open"] : ""}`}>
          {
            props.data.length > 0 ?
              props.data.map((item, index) => {
                return <li 
                  className={item.selected ? styles["item-selected"] : ""} 
                  onClick={() => this.onClick(item)} 
                  key={index}>
                  {item.text}
                </li>;
              })
              : null
          }
        </ul>
      </div>
    );
  }
}