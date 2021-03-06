import React from "react";
import cls from "./card.scss";

export default class Card extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div {...this.props} className={cls["card-box"]+" "+this.props.className}>
        {this.props.children}
      </div>
    );
  }
}