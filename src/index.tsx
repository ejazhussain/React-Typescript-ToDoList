import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./components/app";
//import generated css file here as well. so webpack can combine into bundle as well
import "./styles/styles.scss";

const ROOT = document.querySelector(".container");

ReactDOM.render(<App />, ROOT);