import React from "react";
import cls from "./input.scss";

export default class Input extends React.Component{
  constructor(props){
    super(props);
    this.onInput = this.onInput.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }
  onInput(e){
    if(this.props.onInput){
      this.props.onInput(e);
    }
  }
  onFocus(e){
    if(this.props.onFocus){
      this.props.onFocus(e);
    }
  }
  onBlur(e){
    if(this.props.onBlur){
      this.props.onBlur(e);
    }
  }
  onChange(e){
    if(this.props.onChange){
      this.props.onChange(e);
    }
  }
  onKeyDown(e){
    if(this.props.onKeyDown){
      this.props.onKeyDown(e);
    }
  }
  onKeyUp(e){
    if(this.props.onKeyUp){
      this.props.onKeyUp(e);
    }
  }
  onKeyPress(e){
    if(this.props.onKeyPress){
      this.props.onKeyPress(e);
    }
  }
  render(){
    const props = this.props;
    return(
      <span className={cls["input-box"]}>
        {
          props.prefix ? 
            <span className={`iconfont icon-${props.prefix} ${cls["input-prefix"]}`}></span>
            : null
        }
        <input 
          {...props}
          onInput={e => this.onInput(e)}
          onChange={e => this.onChange(e)}
          onFocus={e => this.onFocus(e)}
          onBlur={e => this.onBlur(e)}
          onKeyUp={e => this.onKeyUp(e)}
          onKeyDown={e => this.onKeyDown(e)}
          onKeyPress={e => this.onKeyPress(e)}
          className={cls["my-input"]+" "+
            ((props.prefix || props.nextfix) ? "my-input-icon" : "")+" "+
            (props.prefix ? cls["my-input-prefix"] : "")+" "+
            (props.nextfix ? cls["my-input-nextfix"] : "")} 
        />
        {
          props.nextfix ?
            <span className={`fa fa-${props.nextfix} ${cls["input-nextfix"]}`}></span>
            : null
        }
      </span>
    );
  }
}