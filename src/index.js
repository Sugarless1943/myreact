import React from "react";
import ReactDOM from "react-dom/client";
import MyReact from "./MyReact";

console.log(MyReact);

const element = MyReact.createElement(
  "div",
  {
    title: "halo",
  },
  "wtf"
);

const container = document.getElementById("root");
MyReact.render(element, container);
