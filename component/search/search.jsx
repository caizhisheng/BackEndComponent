import React from "react";
import cls from "./search.scss";

import Input from "../input/input";

export default class Search extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div {...this.props} className={cls["search-box"]}>
        <Input prefix="search" {...this.props} />
      </div>
    );
  }
}