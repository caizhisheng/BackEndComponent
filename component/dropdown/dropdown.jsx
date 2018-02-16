import React from "react";
import cls from "./dropdown.scss";

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: true,
    };
    this.onClick = this.onClick.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }
  onClick(index, item) {
    const props = this.props;
    if (props.onClick) {
      props.onClick(index, item);
    }
    setTimeout(() => {
      this.setState({ hide: true });
    }, 100);
  }
  toggleDropdown() {
    this.setState({ hide: !this.state.hide });
  }
  render() {
    const { icon, label, data } = this.props;
    const { hide } = this.state;
    return (
      <div className={cls["dropdown-box"]}>
        <div className={cls["dropdown-info"]}>
          {
            icon && icon !== "" ?
              <img src={icon} alt="" /> : null
          }
          <div onClick={this.toggleDropdown}>
            <span>{label} <i className={cls["fa"] + " " + cls["fa-angle-down"]}></i></span>
          </div>
        </div>
        <ul className={cls["dropdown-menu"] + " " + cls[`${hide ? "dropdown-hide" : ""}`]}
          style={{ height: hide ? 0 : data.length * 36 + "px" }}>
          {
            data.map((item, index) => {
              return <li onClick={() => this.onClick(index, item)} key={index}>{item.title}</li>;
            })
          }
        </ul>
      </div>
    );
  }
}