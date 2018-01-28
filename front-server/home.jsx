import React from "react";
import { render } from "react-dom";

import styles from "./home.scss";

import Index from "./page/index/index";
import Login from "./page/login/login";

import Input from "../component/input/input";
import Timepicker from "../component/timepicker/timepicker";

import SmallPie from "../component/charts/smallPie/smallPie";

render(
  <div style={{width: "220px"}}>
    <SmallPie data={{complete: 90, notComplete: 10}} />
  </div>,
  document.getElementById("app"),
)