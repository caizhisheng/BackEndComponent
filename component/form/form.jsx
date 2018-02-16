import React from "react";
import cls from "./form.scss";

function Form(props) {
  return (
    <form>
      {props.children}
    </form>
  );
}
Form.Item = function (props) {
  return (
    <div className={cls["form-item"] + " "+ cls[`form-item-${props.direction}`]}>
      {
        props.label ?
          <label className={cls["form-item-title"]}>
            {
              props.isRequire != null ?
                <span className={cls["item-title-require"]}>*</span>
                : null
            }
            {props.label}：
          </label>
          : null
      }
      <div className={cls["form-item-content"]}>
        {props.children}
        <span className={cls["form-item-tip"]}></span>
      </div>
    </div>
  );
};

Form.Item.defaultProps = {
  direction: "horizontal"
};

export default Form;