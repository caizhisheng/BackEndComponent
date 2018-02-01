import React from "react";
import { render } from "react-dom";

import styles from "./home.scss";

import Index from "./page/index/index";
import Login from "./page/login/login";

import Input from "../component/input/input";
import Timepicker from "../component/timepicker/timepicker";

import SmallPie from "../component/charts/smallPie/smallPie";
import Search from "../component/search/search";

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

render(
  <Modal title="弹窗测试">
    <div style={{width: "150px"}}>
      <Select data={selectData} defaultValue={"3"} />
    </div>
  </Modal>,
  document.getElementById("app"),
)