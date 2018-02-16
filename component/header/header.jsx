import React from "react";
import cls from "./header.scss";

export default class Header extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const {headerMenu} = this.props;
    return(
      <div className={cls["header-box"]}>
        <div className={cls["header-logo"]}></div>
        <ul className={cls["header-menu"]}>
          {
            headerMenu.map((item, index) => {
              return <li key={index}>{item.title}</li>;
            })
          }
        </ul>
        { this.props.children }
      </div>
    );
  }
}