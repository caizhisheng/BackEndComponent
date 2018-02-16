import React from "react";
import cls from "./button.scss";

export default class Button extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const props = this.props;
    const typeList = ["primary", "warning", "danger", "default"];
    let type = props.type;
    if (!props.type || typeList.indexOf(props.type) === -1) type = "default";
    return (
      <button
        {...props}
        type={props.htmlType}
        className={cls["btn"] + " " + cls[`btn-${type}`] + " " + (props.className ? props.className : "")}>{this.props.children}</button>
    );
  }
}

Button.defaultProps = {
  htmlType: "button"
};