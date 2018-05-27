import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import UISelect from "./ui.select.jsx";

import data1 from "./data/select1.json";
import data2 from "./data/select1.json";

class App extends Component {
  render() {
    return (
      <div className="test-app" dir="rtl" style={{ overflow: "auto" }}>
        <div className="menu">
          <div className="col col1">
            <UISelect options={data1} />
          </div>
        </div>

        <div className="main">
          <UISelect options={data2} />
        </div>

        <div className="right">
          <UISelect options={data1} />
        </div>
      </div>
    );
  }
}

export default App;
