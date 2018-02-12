import * as React from "react";
import * as ReactDOM from "react-dom";
import {MainPage} from "./containers/MainPage";
import "./index.scss";

require("whatwg-fetch");

ReactDOM.render(<MainPage/>, document.getElementById("root"));

// window.addEventListener("beforeunload", () => {
//     window["ws"].close();
// });
