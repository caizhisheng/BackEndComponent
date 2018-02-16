import React from "react";
import { render } from "react-dom";
import Test from "./test";

import styles from "./home.scss";

import Login from "./page/login/login";

render(
  <Login></Login>,
  document.getElementById("app"),
)