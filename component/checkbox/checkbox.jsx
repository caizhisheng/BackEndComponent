import React from "react";
import cls from "./checkbox.scss";

export default class Checkbox extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const props = this.props;
    return(
      <div className={cls["checkbox-box"]}>
        <input id={props.id} type="checkbox" />
        <label for={props.id}>{props.label}</label>
      </div>
    );
  }
}

Checkbox.defaultProps = {
  id: "checkbox1"
};